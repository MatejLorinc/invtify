package com.invtify.backend.service;

import com.invtify.backend.model.UserModel;
import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.token.TokenModel;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserModel getUserModel(String id) {
        User user = getUser(id);

        return UserModel.builder()
                .userId(user.getId())
                .tokens(getTokenModelsMap(user))
                .investments(getInvestmentModels(user))
                .build();
    }

    public User getUser(String id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            user = new User(id);
            userRepository.save(user);
        }
        return user;
    }

    private HashMap<Broker, TokenModel> getTokenModelsMap(User user) {
        return user.getTokens().stream()
                .map(TokenModel::create)
                .collect(Collectors.toMap(TokenModel::getBroker, tokenModel -> tokenModel, (prev, next) -> next, HashMap::new));
    }

    private List<InvestmentModel> getInvestmentModels(User user) {
        return user.getInvestments().stream().map(InvestmentModel::create).toList();
    }
}
