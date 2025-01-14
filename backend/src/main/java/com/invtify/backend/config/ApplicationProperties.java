package com.invtify.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

@ConfigurationProperties(prefix = "application")
public record ApplicationProperties(String clientOriginUrl) {
    @ConstructorBinding
    public ApplicationProperties {
    }

}
