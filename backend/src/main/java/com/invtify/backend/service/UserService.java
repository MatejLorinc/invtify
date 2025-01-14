package com.invtify.backend.service;

import com.invtify.backend.model.UserModel;
import com.invtify.backend.model.token.TokenModel;
import com.invtify.backend.model.token.TokenProvider;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserModel getUserModel(String id) {
        User user = getUser(id);

        return UserModel.builder()
                .tokens(getTokenModelsMap(user))
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

    private HashMap<TokenProvider, TokenModel> getTokenModelsMap(User user) {
        return user.getTokens().stream()
                .map(token -> TokenModel.builder().provider(token.getProvider()).token(token.getToken()).build())
                .collect(Collectors.toMap(TokenModel::getProvider, tokenModel -> tokenModel, (prev, next) -> next, HashMap::new));
    }
}
