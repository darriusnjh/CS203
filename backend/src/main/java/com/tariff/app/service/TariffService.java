package com.tariff.app.service;

import com.tariff.app.dto.TariffCalculationRequest;
import com.tariff.app.dto.TariffCalculationResponse;
import com.tariff.app.entity.Tariff;
import com.tariff.app.repository.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;

@Service
public class TariffService {
    
    @Autowired
    private TariffRepository tariffRepository;
    
    public TariffCalculationResponse calculateTariff(TariffCalculationRequest request) {
        Optional<Tariff> tariffOptional = tariffRepository.findByHts8(request.getHts8());
        String countryCode = request.getOriginCountry();
        ArrayList<String> dutyTypes = new ArrayList<>();

        if (tariffOptional.isPresent()) {
            Tariff tariff = tariffOptional.get();
            Double AdValRate = 0.0;
            Double SpecificRate = 0.0;
            Double OtherRate = 0.0;

            switch (countryCode) {
                case "JO":
                    AdValRate = tariff.getJordanAdValRate() != null ? tariff.getJordanAdValRate() : tariff.getMfnAdValRate();
                    SpecificRate = tariff.getJordanSpecificRate() != null ? tariff.getJordanSpecificRate() : tariff.getMfnSpecificRate();
                    OtherRate = tariff.getJordanOtherRate() != null ? tariff.getJordanOtherRate() : tariff.getMfnOtherRate();
                    break;
                case "SG":
                    AdValRate = tariff.getSingaporeAdValRate() != null ? tariff.getSingaporeAdValRate() : tariff.getMfnAdValRate();
                    SpecificRate = tariff.getSingaporeSpecificRate() != null ? tariff.getSingaporeSpecificRate() : tariff.getMfnSpecificRate();
                    OtherRate = tariff.getSingaporeOtherRate() != null ? tariff.getSingaporeOtherRate() : tariff.getMfnOtherRate();
                    break;
                case "AU":
                    AdValRate = tariff.getAustraliaAdValRate() != null ? tariff.getAustraliaAdValRate() : tariff.getMfnAdValRate();
                    SpecificRate = tariff.getAustraliaSpecificRate() != null ? tariff.getAustraliaSpecificRate() : tariff.getMfnSpecificRate();
                    OtherRate = tariff.getAustraliaOtherRate() != null ? tariff.getAustraliaOtherRate() : tariff.getMfnOtherRate();
                    break;
                default:
                    AdValRate = tariff.getMfnAdValRate();
                    SpecificRate = tariff.getMfnSpecificRate();
                    OtherRate = tariff.getMfnOtherRate();
                    break;
            }

            
            Double tariffAmount = request.getItemValue() * (AdValRate);
            Double specificRateAmount = request.getItemValue() * (SpecificRate);
            Double otherRateAmount = request.getItemValue() * (OtherRate);
            Double totalTariffPercentage = AdValRate + SpecificRate + OtherRate;
            Double totalCost = request.getItemValue() + tariffAmount + specificRateAmount + otherRateAmount;
            
            return new TariffCalculationResponse(
                request.getHts8(),
                tariff.getBriefDescription(),
                request.getItemValue(),
                request.getItemQuantity(),
                request.getOriginCountry(),
                AdValRate,
                SpecificRate,
                OtherRate,
                tariffAmount,
                totalCost,
                true,
                totalTariffPercentage,
                dutyTypes
            );
        } else {
            // No tariff found, return response with zero tariff
            return new TariffCalculationResponse(
                request.getHts8(),
                "Product not found",
                request.getItemValue(),
                request.getItemQuantity(),
                request.getOriginCountry(),
                0.0,
                0.0,
                0.0,
                0.0,
                request.getItemValue(),
                false,
                0.0,
                dutyTypes
            );
        }
    }
}

