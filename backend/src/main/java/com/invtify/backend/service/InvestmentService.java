package com.invtify.backend.service;

import com.invtify.backend.api.dto.CreateInvestmentStrategyDto;
import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.investment.InvestmentStrategy;
import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.persistance.entity.Token;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.InvestmentRepository;
import com.invtify.backend.service.broker.services.InvestmentAssetService;
import com.invtify.backend.service.broker.services.OpenPosition;
import com.invtify.backend.service.broker.services.OpenPositionsService;
import com.invtify.backend.utils.CacheEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    public final static Duration CACHE_EXPIRATION = Duration.ofMinutes(30);
    private static final Map<String, Object> userLocks = new ConcurrentHashMap<>();
    private final InvestmentAssetService assetService;
    private final InvestmentRepository investmentRepository;
    private final OpenPositionsService openPositionsService;
    private final UserService userService;
    private final Map<String, CacheEntry<Collection<InvestmentModel>>> cache = new ConcurrentHashMap<>();

    public Collection<InvestmentModel> getInvestments(String userId) {
        Object userLock = userLocks.computeIfAbsent(userId, k -> new Object());

        synchronized (userLock) {
            try {
                CacheEntry<Collection<InvestmentModel>> cachedEntry = cache.get(userId);
                if (cachedEntry != null && !cachedEntry.isExpired()) {
                    return cachedEntry.getData();
                }

                User user = userService.getUser(userId);

                Set<Broker> brokers = user.getInvestments().stream()
                        .map(investment -> investment.getAsset().getBroker())
                        .collect(Collectors.toSet());

                Map<Broker, Token> tokensByBroker = user.getTokens().stream()
                        .filter(token -> brokers.contains(token.getBroker()))
                        .collect(Collectors.toMap(Token::getBroker, token -> token));

                Map<Broker, List<OpenPosition>> openPositionsByBroker = brokers.stream()
                        .collect(Collectors.toMap(
                                broker -> broker,
                                broker -> {
                                    Token token = tokensByBroker.get(broker);
                                    if (token == null) {
                                        return List.of();
                                    }
                                    return openPositionsService.getOpenPositions(broker, token.getToken()).join();
                                }
                        ));

                Collection<InvestmentModel> investments = user.getInvestments().stream().map(investment -> {
                    InvestmentAsset asset = investment.getAsset();
                    Broker broker = asset.getBroker();
                    String assetTicker = asset.getTicker();

                    List<OpenPosition> openPositions = openPositionsByBroker.getOrDefault(broker, List.of());
                    OpenPosition position = openPositions.stream()
                            .filter(p -> p.assetTicker().equals(assetTicker))
                            .findAny()
                            .orElse(new OpenPosition(broker, assetTicker, 0, 0));

                    return InvestmentModel.create(investment, position);
                }).toList();

                cache.put(userId, new CacheEntry<>(investments, CACHE_EXPIRATION));
                return investments;

            } finally {
                userLocks.remove(userId);
            }
        }
    }

    public void setInvestment(String userId, CreateInvestmentStrategyDto createInvestmentStrategyDto) {
        User user = userService.getUser(userId);
        InvestmentStrategy investmentStrategy = createStrategyFromCreateDto(createInvestmentStrategyDto);
        createInvestment(user, investmentStrategy);
    }

    private InvestmentStrategy createStrategyFromCreateDto(CreateInvestmentStrategyDto createDto) {
        return InvestmentStrategy.builder()
                .asset(assetService.getInvestmentAsset(createDto.getAssetId()))
                .strategy(createDto.getStrategy())
                .frequency(createDto.getFrequency())
                .amount(createDto.getAmount())
                .priceDrop(createDto.getPriceDrop())
                .createdAt(createDto.getCreatedAt())
                .build();
    }

    public void createInvestment(User user, InvestmentStrategy investmentStrategy) {
        Investment investment = new Investment();
        editInvestment(user, investment, investmentStrategy);
    }

    public void editInvestment(User user, Investment investment, InvestmentStrategy investmentStrategy) {
        investment.setUser(user);
        investment.setAsset(investmentStrategy.getAsset());
        investment.setStrategy(investmentStrategy.getStrategy());
        investment.setFrequencyType(investmentStrategy.getFrequency().type());
        investment.setFrequencyDay(investmentStrategy.getFrequency().day());
        investment.setFrequencyHour(investmentStrategy.getFrequency().hour());
        investment.setAmount(investmentStrategy.getAmount());
        investment.setCreatedAt(investmentStrategy.getCreatedAt());
        investmentRepository.save(investment);
    }


    public boolean deleteInvestment(String userId, long investmentId) {
        Investment investment = investmentRepository.findById(investmentId).orElse(null);
        if (investment == null) return false;
        if (!investment.getUser().getId().equals(userId)) {
            return false;
        }
        investmentRepository.deleteById(investmentId);
        return true;
    }
}
