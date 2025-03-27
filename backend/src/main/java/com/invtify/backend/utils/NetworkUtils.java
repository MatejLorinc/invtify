package com.invtify.backend.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class NetworkUtils {
    private NetworkUtils() {
        throw new IllegalStateException("Utility class cannot be instantiated");
    }

    public static <T> T getHttpRequest(String host, String pathname, String authorizationToken, TypeReference<T> typeReference) {
        HttpClient httpClient = HttpClient.newBuilder().build();
        ObjectMapper objectMapper = new ObjectMapper();
        int maxRetries = 5;
        int retryDelayMs = 3000;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .GET()
                        .uri(URI.create(host + pathname))
                        .header("Authorization", authorizationToken)
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 429) {
                    if (attempt < maxRetries) {
                        System.out.println("Received 429 Too Many Requests. Retrying in " + (retryDelayMs / 1000) + " seconds...");
                        Thread.sleep(retryDelayMs);
                        continue;
                    } else {
                        System.err.println("Max retry attempts reached. Request failed due to 429 Too Many Requests.");
                        return null;
                    }
                }

                return objectMapper.readValue(response.body(), typeReference);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
