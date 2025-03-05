package com.invtify.backend.service;

import com.invtify.backend.model.UserModel;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserModel getUserModel(String id) {
        User user = getUser(id);

        return UserModel.builder()
                .userId(user.getId())
                .build();
    }

    @Transactional
    public User getUser(String id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            user = new User(id);
            userRepository.save(user);
        }
        return user;
    }
}
