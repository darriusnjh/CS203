package com.tariff.app.controller;

import com.tariff.app.dto.DashboardDataResponse;
import com.tariff.app.dto.ProductTariffData;
import com.tariff.app.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/data")
    public ResponseEntity<DashboardDataResponse> getDashboardData() {
        try {
            DashboardDataResponse data = dashboardService.getDashboardData();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/data/{countryCode}")
    public ResponseEntity<DashboardDataResponse> getCountrySpecificData(
            @PathVariable String countryCode,
            @RequestParam(required = false) String category) {
        try {
            DashboardDataResponse data = dashboardService.getCountrySpecificData(countryCode, category);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/products/{countryCode}")
    public ResponseEntity<List<ProductTariffData>> getCountryProductTariffs(@PathVariable String countryCode) {
        try {
            List<ProductTariffData> data = dashboardService.getCountryProductTariffs(countryCode);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Dashboard API is running");
    }
}
