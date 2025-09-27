package com.tariff.app.controller;

import com.tariff.app.dto.DashboardDataResponse;
import com.tariff.app.dto.ProductTariffData;
import com.tariff.app.service.DashboardService;
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
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@Tag(name = "Dashboard", description = "APIs for dashboard data and analytics")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Operation(summary = "Get Dashboard Data", description = "Retrieve general dashboard data and statistics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dashboard data retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = DashboardDataResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/data")
    public ResponseEntity<DashboardDataResponse> getDashboardData() {
        try {
            DashboardDataResponse data = dashboardService.getDashboardData();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Get Country-Specific Data", description = "Retrieve dashboard data filtered by country code and optional category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Country-specific data retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = DashboardDataResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/data/{countryCode}")
    public ResponseEntity<DashboardDataResponse> getCountrySpecificData(
            @Parameter(description = "ISO 3166-1 alpha-2 country code", required = true, example = "US")
            @PathVariable String countryCode,
            @Parameter(description = "Optional category filter", example = "electronics")
            @RequestParam(required = false) String category) {
        try {
            DashboardDataResponse data = dashboardService.getCountrySpecificData(countryCode, category);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Get Country Product Tariffs", description = "Retrieve product tariff data for a specific country")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product tariff data retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductTariffData.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/products/{countryCode}")
    public ResponseEntity<List<ProductTariffData>> getCountryProductTariffs(
            @Parameter(description = "ISO 3166-1 alpha-2 country code", required = true, example = "CN")
            @PathVariable String countryCode) {
        try {
            List<ProductTariffData> data = dashboardService.getCountryProductTariffs(countryCode);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Health Check", description = "Check if the Dashboard API is running")
    @ApiResponse(responseCode = "200", description = "API is healthy")
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Dashboard API is running");
    }
}
