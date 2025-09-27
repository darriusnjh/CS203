package com.tariff.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tariff Calculator API")
                        .description("A comprehensive API for calculating customs tariffs, managing user accounts, and providing gaming features for tariff education.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Tariff Calculator Team")
                                .email("team@tariffcalculator.com")
                                .url("https://tariffcalculator.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Development server"),
                        new Server()
                                .url("https://api.tariffcalculator.com")
                                .description("Production server")
                ))
                .tags(List.of(
                        new Tag().name("Tariff Calculator").description("APIs for calculating customs tariffs and retrieving tariff information"),
                        new Tag().name("User Management").description("APIs for user authentication, registration, and profile management"),
                        new Tag().name("Dashboard").description("APIs for dashboard data and analytics"),
                        new Tag().name("Gaming System").description("APIs for game scoring, leaderboards, and user statistics"),
                        new Tag().name("Forum").description("APIs for forum posts, comments, and community features")
                ));
    }
}
