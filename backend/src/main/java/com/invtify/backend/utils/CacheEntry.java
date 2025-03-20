package com.invtify.backend.utils;

import lombok.Getter;

import java.time.Duration;
import java.time.Instant;

public class CacheEntry<T> {
    @Getter
    private final T data;
    private final Instant timestamp;
    private final Duration expiration;

    public CacheEntry(T data, Duration expiration) {
        this.data = data;
        this.expiration = expiration;
        this.timestamp = Instant.now();
    }

    public boolean isExpired() {
        return Instant.now().isAfter(timestamp.plus(expiration));
    }
}
