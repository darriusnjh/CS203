package com.tariff.app.service;

import com.tariff.app.dto.TariffCalculationRequest;
import com.tariff.app.dto.TariffCalculationResponse;
import com.tariff.app.dto.TariffInfo;
import com.tariff.app.entity.Tariff;
import com.tariff.app.entity.USTariff;
import com.tariff.app.repository.USTariffRepository;
import com.tariff.app.repository.ChinaTariffRepository;
import com.tariff.app.repository.SingaporeTariffRepository;
import com.tariff.app.repository.UKTariffRepository;
import com.tariff.app.repository.JapanTariffRepository;
import com.tariff.app.repository.SouthKoreaTariffRepository;
import com.tariff.app.repository.CanadaTariffRepository;
import com.tariff.app.repository.AustraliaTariffRepository;
import com.tariff.app.repository.FranceTariffRepository;
import com.tariff.app.repository.IndiaTariffRepository;
import com.tariff.app.repository.IndonesiaTariffRepository;
import com.tariff.app.repository.IsraelTariffRepository;
import com.tariff.app.repository.ItalyTariffRepository;
import com.tariff.app.repository.MexicoTariffRepository;
import com.tariff.app.repository.SaudiArabiaTariffRepository;
import com.tariff.app.repository.SouthAfricaTariffRepository;
import com.tariff.app.repository.TurkeyTariffRepository;
import com.tariff.app.repository.BrazilTariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TariffService {
    
    @Autowired
    private USTariffRepository usTariffRepository;
    @Autowired
    private ChinaTariffRepository chinaTariffRepository;
    @Autowired
    private SingaporeTariffRepository singaporeTariffRepository;
    @Autowired
    private UKTariffRepository ukTariffRepository;
    @Autowired
    private JapanTariffRepository japanTariffRepository;
    @Autowired
    private SouthKoreaTariffRepository southKoreaTariffRepository;
    @Autowired
    private CanadaTariffRepository canadaTariffRepository;
    @Autowired
    private AustraliaTariffRepository australiaTariffRepository;
    @Autowired
    private FranceTariffRepository franceTariffRepository;
    @Autowired
    private IndiaTariffRepository indiaTariffRepository;
    @Autowired
    private IndonesiaTariffRepository indonesiaTariffRepository;
    @Autowired
    private IsraelTariffRepository israelTariffRepository;
    @Autowired
    private ItalyTariffRepository italyTariffRepository;
    @Autowired
    private MexicoTariffRepository mexicoTariffRepository;
    @Autowired
    private SaudiArabiaTariffRepository saudiArabiaTariffRepository;
    @Autowired
    private SouthAfricaTariffRepository southAfricaTariffRepository;
    @Autowired
    private TurkeyTariffRepository turkeyTariffRepository;
    @Autowired
    private BrazilTariffRepository brazilTariffRepository;

    // Method to get the appropriate repository based on countryOfArrival
    private Optional<Tariff> findTariffByHts8(String hts8, String countryOfArrival) {
        switch (countryOfArrival.toUpperCase()) {
            case "AU":
            case "AUSTRALIA":
                return australiaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "BR":
            case "BRAZIL":
                return brazilTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "CA":
            case "CANADA":
                return canadaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "CN":
            case "CHINA":
                return chinaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "FR":
            case "FRANCE":
                return franceTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "IN":
            case "INDIA":
                return indiaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "ID":
            case "INDONESIA":
                return indonesiaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "IL":
            case "ISRAEL":
                return israelTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "IT":
            case "ITALY":
                return italyTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "JP":
            case "JAPAN":
                return japanTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "MX":
            case "MEXICO":
                return mexicoTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "SA":
            case "SAUDI_ARABIA":
                return saudiArabiaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "SG":
            case "SINGAPORE":
                return singaporeTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "ZA":
            case "SOUTH_AFRICA":
                return southAfricaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "KR":
            case "SOUTH_KOREA":
                return southKoreaTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "TR":
            case "TURKEY":
                return turkeyTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "GB":
            case "UK":
                return ukTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
            case "US":
            case "USA":
            default:
                return usTariffRepository.findByHts8(hts8).map(t -> (Tariff) t);
        }
    }

    public TariffCalculationResponse calculateTariff(TariffCalculationRequest request) {
        String countryOfArrival = request.getCountryOfArrival();
        String countryCode = request.getOriginCountry();
        ArrayList<String> dutyTypes = new ArrayList<>();

        // Get the appropriate tariff based on countryOfArrival
        Optional<? extends Tariff> tariffOptional = findTariffByHts8(request.getHts8(), countryOfArrival);

        if (tariffOptional.isPresent()) {
            Tariff tariff = tariffOptional.get();
            
            // Extract basic tariff information
            Double mfnAdValRate = tariff.getMfnAdValRate() != null ? tariff.getMfnAdValRate() : 0.0;
            Double mfnSpecificRate = tariff.getMfnSpecificRate() != null ? tariff.getMfnSpecificRate() : 0.0;
            Double mfnOtherRate = tariff.getMfnOtherRate() != null ? tariff.getMfnOtherRate() : 0.0;
            
            // For US tariffs, apply special rates based on origin country
            Double AdValRate = mfnAdValRate;
            Double SpecificRate = mfnSpecificRate;
            Double OtherRate = mfnOtherRate;
            Double col2AdValRate = 0.0;
            Double col2SpecificRate = 0.0;
            Double col2OtherRate = 0.0;

            col2AdValRate = tariff.getCol2AdValRate() != null ? tariff.getCol2AdValRate() : 0.0;
            col2SpecificRate = tariff.getCol2SpecificRate() != null ? tariff.getCol2SpecificRate() : 0.0;
            col2OtherRate = tariff.getCol2OtherRate() != null ? tariff.getCol2OtherRate() : 0.0;

            // Apply special rates based on origin country
            switch (countryCode) {
                case "JO":
                    AdValRate = tariff.getJordanAdValRate() != null ? tariff.getJordanAdValRate() : mfnAdValRate;
                    SpecificRate = tariff.getJordanSpecificRate() != null ? tariff.getJordanSpecificRate() : mfnSpecificRate;
                    OtherRate = tariff.getJordanOtherRate() != null ? tariff.getJordanOtherRate() : mfnOtherRate;
                    col2AdValRate = 0.0;
                    col2SpecificRate = 0.0;
                    col2OtherRate = 0.0;
                    break;
                case "SG":
                    AdValRate = tariff.getSingaporeAdValRate() != null ? tariff.getSingaporeAdValRate() : mfnAdValRate;
                    SpecificRate = tariff.getSingaporeSpecificRate() != null ? tariff.getSingaporeSpecificRate() : mfnSpecificRate;
                    OtherRate = tariff.getSingaporeOtherRate() != null ? tariff.getSingaporeOtherRate() : mfnOtherRate;
                    col2AdValRate = 0.0;
                    col2SpecificRate = 0.0;
                    col2OtherRate = 0.0;
                    break;
                case "AU":
                    AdValRate = tariff.getAustraliaAdValRate() != null ? tariff.getAustraliaAdValRate() : mfnAdValRate;
                    SpecificRate = tariff.getAustraliaSpecificRate() != null ? tariff.getAustraliaSpecificRate() : mfnSpecificRate;
                    OtherRate = tariff.getAustraliaOtherRate() != null ? tariff.getAustraliaOtherRate() : mfnOtherRate;
                    col2AdValRate = 0.0;
                    col2SpecificRate = 0.0;
                    col2OtherRate = 0.0;
                    break;
                default:
                    AdValRate = mfnAdValRate;
                    SpecificRate = mfnSpecificRate;
                    OtherRate = mfnOtherRate;
                    break;
            }

            // Calculate tariff amounts
            Double tariffAmount = request.getItemValue() * (AdValRate + col2AdValRate);
            Double specificRateAmount = request.getItemValue() * (SpecificRate + col2SpecificRate);
            Double otherRateAmount = request.getItemValue() * (OtherRate + col2OtherRate);
            Double totalTariffPercentage = AdValRate + SpecificRate + OtherRate + col2AdValRate + col2SpecificRate + col2OtherRate;
            Double totalCost = request.getItemValue() + tariffAmount + specificRateAmount + otherRateAmount;
            
            return new TariffCalculationResponse(
                tariff.getHts8(),
                tariff.getBriefDescription(),
                tariff.getMfnTextRate(),
                request.getItemValue(),
                request.getItemQuantity(),
                request.getOriginCountry(),
                AdValRate + col2AdValRate,
                SpecificRate + col2SpecificRate,
                OtherRate + col2OtherRate,
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
                "",
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

    public TariffInfo getTariffInfo(TariffCalculationRequest request) {
        String countryOfArrival = request.getCountryOfArrival();
        Optional<? extends Tariff> tariffOptional = findTariffByHts8(request.getHts8(), countryOfArrival);
        
        if (tariffOptional.isPresent()) {
            Tariff tariff = tariffOptional.get();
            return new TariffInfo(
                tariff.getHts8(), 
                tariff.getBriefDescription(), 
                tariff.getMfnTextRate(), 
                tariff.getMfnAdValRate(), 
                tariff.getMfnSpecificRate(), 
                tariff.getMfnOtherRate()
            );
        } else {
            return null;
        }
    }
    
    public List<TariffInfo> searchTariffs(String searchTerm) {
        // For now, search only in US tariffs - you might want to extend this to search across all countries
        List<USTariff> tariffs = usTariffRepository.findByHts8OrDescriptionContaining(searchTerm);
        return tariffs.stream()
                .map(tariff -> new TariffInfo(
                    tariff.getHts8(), 
                    tariff.getBriefDescription(), 
                    tariff.getMfnTextRate(), 
                    tariff.getMfnAdValRate(), 
                    tariff.getMfnSpecificRate(), 
                    tariff.getMfnOtherRate()
                ))
                .collect(Collectors.toList());
    }
}