// src/main/java/com/tariff/app/controller/ChatController.java
package com.tariff.app.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class AiController {

    private final WebClient openai;
    @Value("${openai.model:gpt-4o}")
    private String openaiModel;
    @Value("${mcp.server.url:}")
    private String mcpServerUrl;
    @Value("${mcp.server.label:Tariff-MCP}")
    private String mcpServerLabel;
    @Value("${mcp.server.description:A server to get information on tariffs and tools to calculate Tariff}")
    private String mcpServerDescription;

    public AiController(@Value("${openai.api.key}") String apiKey) {
        this.openai = WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Object chat(@RequestBody Map<String, Object> body) {
        String userMessage = String.valueOf(body.getOrDefault("message", ""));

        @SuppressWarnings("unchecked")
        List<Map<String, String>> history = (List<Map<String, String>>) body.get("history");
        if (history == null) {
            history = new ArrayList<>();
        }
        boolean hasSystem = false;
        for (Map<String, String> msg : history) {
            if ("system".equals(msg.get("role"))) {
                hasSystem = true;
                break;
            }
        }
        if (!hasSystem) {
            Map<String, String> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", """
You are a helpful Tariff assistant. When the user asks for a product but does not provide a hts8 code, use the `find_hts8` tool to get the hts8 code. Your task is to collect values for hts8 (string with full 8 digits like 84191000), itemValue (integer), itemQuantity (integer), originCountry (2 letter code like US), countryOfArrival (2 letter code like US), and modeOfTransport (one of [air, sea, land]), entryDate, and loadingDate before calling the `calculate_tariff` tool. Always update the user on the current values for tariff calculation. Respond concisely.
""");
            history.add(systemMsg);
        }
        if (userMessage != null && !userMessage.isBlank()) {
            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", userMessage);
            history.add(userMsg);
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);
        payload.put("input", history);
        if (mcpServerUrl != null && !mcpServerUrl.isBlank()) {
            List<Map<String, Object>> tools = new ArrayList<>();
            Map<String, Object> mcp = new HashMap<>();
            mcp.put("type", "mcp");
            mcp.put("server_label", mcpServerLabel);
            mcp.put("server_description", mcpServerDescription);
            mcp.put("server_url", mcpServerUrl);
            mcp.put("require_approval", "never");
            tools.add(mcp);
            payload.put("tools", tools);
        }

        return openai.post()
            .uri("/responses")
            .bodyValue(payload)
            .retrieve()
            .bodyToMono(Object.class)
            .block(); // or return Mono for reactive stacks
    }
}