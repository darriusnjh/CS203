package com.tariff.app.controller;

import com.tariff.app.dto.TariffCalculationRequest;
import com.tariff.app.dto.TariffCalculationResponse;
import com.tariff.app.service.TariffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tariff")
@CrossOrigin(origins = "*")
public class TariffController {
    
    @Autowired
    private TariffService tariffService;
    
    @PostMapping("/calculate")
    public ResponseEntity<TariffCalculationResponse> calculateTariff(@RequestBody TariffCalculationRequest request) {
        TariffCalculationResponse response = tariffService.calculateTariff(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Tariff Calculator API is running");
    }
}

