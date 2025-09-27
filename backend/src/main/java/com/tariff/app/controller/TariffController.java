package com.tariff.app.controller;

import com.tariff.app.dto.TariffCalculationRequest;
import com.tariff.app.dto.TariffCalculationResponse;
import com.tariff.app.dto.TariffInfo;
import com.tariff.app.service.TariffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tariff")
@CrossOrigin(origins = "https://localhost:3000", allowCredentials = "true")
@Tag(name = "Tariff Calculator", description = "APIs for calculating customs tariffs and retrieving tariff information")
public class TariffController {
    
    @Autowired
    private TariffService tariffService;
    
    @Operation(summary = "Calculate Tariff", description = "Calculate customs duties and taxes for imported goods based on HTS code, value, quantity, and other parameters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tariff calculation successful",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TariffCalculationResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input parameters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/calculate")
    public ResponseEntity<TariffCalculationResponse> calculateTariff(
            @Parameter(description = "Tariff calculation request containing HTS code, value, quantity, and other required parameters")
            @RequestBody TariffCalculationRequest request) {
        TariffCalculationResponse response = tariffService.calculateTariff(request);
        return ResponseEntity.ok(response);
    }
    

    @Operation(summary = "Get Tariff Information", description = "Retrieve detailed tariff information for a specific HTS code")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tariff information found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TariffInfo.class))),
            @ApiResponse(responseCode = "404", description = "HTS code not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/info")        
    public ResponseEntity<TariffInfo> getTariffInfo(
            @Parameter(description = "8-digit HTS code to look up", required = true, example = "64039900")
            @RequestParam String htsCode) {
        TariffCalculationRequest request = new TariffCalculationRequest();
        request.setHts8(htsCode);
        TariffInfo response = tariffService.getTariffInfo(request);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Search Tariffs", description = "Search for tariff information using keywords or partial HTS codes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TariffInfo.class))),
            @ApiResponse(responseCode = "400", description = "Invalid search query"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public ResponseEntity<List<TariffInfo>> searchTariffs(
            @Parameter(description = "Search query (keywords or partial HTS code)", required = true, example = "leather shoes")
            @RequestParam String q) {
        List<TariffInfo> results = tariffService.searchTariffs(q);
        return ResponseEntity.ok(results);
    }

    @Operation(summary = "Health Check", description = "Check if the Tariff Calculator API is running")
    @ApiResponse(responseCode = "200", description = "API is healthy")
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Tariff Calculator API is running");
    }
}

