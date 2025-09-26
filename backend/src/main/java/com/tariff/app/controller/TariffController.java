package com.tariff.app.controller;

import com.tariff.app.dto.TariffCalculationRequest;
import com.tariff.app.dto.TariffCalculationResponse;
import com.tariff.app.dto.TariffInfo;
import com.tariff.app.service.TariffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tariff")
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class TariffController {
    
    @Autowired
    private TariffService tariffService;
    
    @PostMapping("/calculate")
    public ResponseEntity<TariffCalculationResponse> calculateTariff(@RequestBody TariffCalculationRequest request) {
        TariffCalculationResponse response = tariffService.calculateTariff(request);
        return ResponseEntity.ok(response);
    }
    

    @GetMapping("/info")        
    public ResponseEntity<TariffInfo> getTariffInfo(@RequestParam String htsCode) {
        TariffCalculationRequest request = new TariffCalculationRequest();
        request.setHts8(htsCode);
        TariffInfo response = tariffService.getTariffInfo(request);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TariffInfo>> searchTariffs(@RequestParam String q) {
        List<TariffInfo> results = tariffService.searchTariffs(q);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Tariff Calculator API is running");
    }
}

