package com.invtify.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class InvtifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvtifyApplication.class, args);
    }

}
