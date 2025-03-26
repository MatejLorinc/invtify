package com.invtify.backend.jobs;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.*;
import com.invtify.backend.persistance.repository.InvestmentDatetimeValueRepository;
import com.invtify.backend.persistance.repository.UserRepository;
import com.invtify.backend.service.broker.services.OpenPosition;
import com.invtify.backend.service.broker.services.OpenPositionsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class StoreInvestmentValueDataTask {
    private final UserRepository userRepository;
    private final InvestmentDatetimeValueRepository investmentDatetimeValueRepository;
    private final OpenPositionsService openPositionsService;

    @Transactional
    @Scheduled(fixedRate = 3600 * 1000)
    public void runTask() {
        for (User user : userRepository.findAll()) {
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

            for (Investment investment : user.getInvestments()) {
                InvestmentAsset asset = investment.getAsset();
                Broker broker = asset.getBroker();
                String assetTicker = asset.getTicker();

                List<OpenPosition> openPositions = openPositionsByBroker.getOrDefault(broker, List.of());
                OpenPosition position = openPositions.stream()
                        .filter(p -> p.assetTicker().equals(assetTicker))
                        .findAny()
                        .orElse(new OpenPosition(broker, assetTicker, 0, 0));

                InvestmentDatetimeValue investmentDatetimeValue = new InvestmentDatetimeValue();

                investmentDatetimeValue.setInvestment(investment);
                investmentDatetimeValue.setDatetime(Timestamp.from(Instant.now()));
                investmentDatetimeValue.setValue(position.price() * position.quantity());

                investmentDatetimeValueRepository.save(investmentDatetimeValue);
            }
        }
    }
}