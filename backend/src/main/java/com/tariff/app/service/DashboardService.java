package com.tariff.app.service;

import com.tariff.app.dto.DashboardDataResponse;
import com.tariff.app.entity.Tariff;
import com.tariff.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

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

    private final Map<String, String> countryNames = new HashMap<String, String>() {{
        put("US", "United States");
        put("CN", "China");
        put("SG", "Singapore");
        put("GB", "United Kingdom");
        put("JP", "Japan");
        put("KR", "South Korea");
        put("CA", "Canada");
        put("AU", "Australia");
        put("FR", "France");
        put("IN", "India");
        put("ID", "Indonesia");
        put("IL", "Israel");
        put("IT", "Italy");
        put("MX", "Mexico");
        put("SA", "Saudi Arabia");
        put("ZA", "South Africa");
        put("TR", "Turkey");
        put("BR", "Brazil");
    }};

    public DashboardDataResponse getDashboardData() {
        List<DashboardDataResponse.CountryTariffData> countryData = new ArrayList<>();
        Map<String, Double> averageRates = new HashMap<>();
        Map<String, Integer> productCounts = new HashMap<>();
        List<DashboardDataResponse.TariffHeatmapData> heatmapData = new ArrayList<>();
        List<DashboardDataResponse.TopImportingCountry> topImportingCountries = new ArrayList<>();

        // Process each country's tariff data
        processCountryData("US", usTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("CN", chinaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("SG", singaporeTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("GB", ukTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("JP", japanTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("KR", southKoreaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("CA", canadaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("AU", australiaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("FR", franceTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("IN", indiaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("ID", indonesiaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("IL", israelTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("IT", italyTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("MX", mexicoTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("SA", saudiArabiaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("ZA", southAfricaTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("TR", turkeyTariffRepository.findAll(), countryData, averageRates, productCounts);
        processCountryData("BR", brazilTariffRepository.findAll(), countryData, averageRates, productCounts);

        // Generate heatmap data
        generateHeatmapData(countryData, heatmapData);

        // Generate top importing countries (mock data for now)
        generateTopImportingCountries(topImportingCountries);

        return new DashboardDataResponse(countryData, averageRates, productCounts, heatmapData, topImportingCountries);
    }

    private void processCountryData(String countryCode, List<? extends Tariff> tariffs, 
                                  List<DashboardDataResponse.CountryTariffData> countryData,
                                  Map<String, Double> averageRates,
                                  Map<String, Integer> productCounts) {
        if (tariffs.isEmpty()) return;

        List<Double> mfnRates = new ArrayList<>();
        List<Double> adValRates = new ArrayList<>();
        List<Double> specificRates = new ArrayList<>();
        List<Double> allRates = new ArrayList<>();

        for (Tariff tariff : tariffs) {
            if (tariff.getMfnAdValRate() != null) {
                mfnRates.add(tariff.getMfnAdValRate());
                allRates.add(tariff.getMfnAdValRate());
            }
            if (tariff.getMfnSpecificRate() != null) {
                specificRates.add(tariff.getMfnSpecificRate());
                allRates.add(tariff.getMfnSpecificRate());
            }
            if (tariff.getMfnOtherRate() != null) {
                allRates.add(tariff.getMfnOtherRate());
            }
        }

        if (!allRates.isEmpty()) {
            double avgMfn = mfnRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            double avgAdVal = adValRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            double avgSpecific = specificRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            double maxRate = allRates.stream().mapToDouble(Double::doubleValue).max().orElse(0.0);
            double minRate = allRates.stream().mapToDouble(Double::doubleValue).min().orElse(0.0);

            String countryName = countryNames.getOrDefault(countryCode, countryCode);
            
            DashboardDataResponse.CountryTariffData data = new DashboardDataResponse.CountryTariffData(
                countryCode, countryName, avgMfn, avgAdVal, avgSpecific, 
                tariffs.size(), maxRate, minRate
            );
            
            countryData.add(data);
            averageRates.put(countryCode, avgMfn);
            productCounts.put(countryCode, tariffs.size());
        }
    }

    private void generateHeatmapData(List<DashboardDataResponse.CountryTariffData> countryData,
                                   List<DashboardDataResponse.TariffHeatmapData> heatmapData) {
        // String[] originCountries = {"US", "CN", "JP", "DE", "GB", "FR", "IT", "CA", "AU", "BR", "IN", "KR", "MX", "SG", "ZA"};
        
        for (DashboardDataResponse.CountryTariffData origin : countryData) {
            for (DashboardDataResponse.CountryTariffData destination : countryData) {
                if (!origin.getCountryCode().equals(destination.getCountryCode())) {
                    // Simulate tariff rates based on trade relationships
                    double baseRate = destination.getAverageMfnRate();
                    double relationshipMultiplier = getRelationshipMultiplier(origin.getCountryCode(), destination.getCountryCode());
                    double finalRate = baseRate * relationshipMultiplier;
                    
                    String rateCategory = categorizeRate(finalRate);
                    
                    DashboardDataResponse.TariffHeatmapData heatmapEntry = 
                        new DashboardDataResponse.TariffHeatmapData(
                            origin.getCountryCode(),
                            destination.getCountryCode(),
                            finalRate,
                            destination.getTotalProducts(),
                            rateCategory
                        );
                    
                    heatmapData.add(heatmapEntry);
                }
            }
        }
    }

    private double getRelationshipMultiplier(String origin, String destination) {
        // Simulate trade agreement effects
        Map<String, Double> multipliers = new HashMap<String, Double>() {{
            put("US-CA", 0.3);
            put("US-MX", 0.4);
            put("CA-US", 0.3);
            put("MX-US", 0.4);
            put("CN-SG", 0.2);
            put("SG-CN", 0.2);
            put("JP-KR", 0.5);
            put("KR-JP", 0.5);
            put("GB-FR", 0.6);
            put("FR-GB", 0.6);
            put("IT-FR", 0.4);
            put("FR-IT", 0.4);
            put("AU-NZ", 0.1);
            put("NZ-AU", 0.1);
            put("BR-AR", 0.7);
            put("AR-BR", 0.7);
        }};
        
        String key = origin + "-" + destination;
        return multipliers.getOrDefault(key, 1.0);
    }

    private String categorizeRate(double rate) {
        if (rate <= 2.0) return "Very Low";
        if (rate <= 5.0) return "Low";
        if (rate <= 10.0) return "Medium";
        if (rate <= 15.0) return "High";
        return "Very High";
    }

    private void generateTopImportingCountries(List<DashboardDataResponse.TopImportingCountry> topImportingCountries) {
        // Mock data for top importing countries
        String[][] mockData = {
            {"US", "United States", "1500000", "3.2", "Electronics"},
            {"CN", "China", "1200000", "8.7", "Manufacturing"},
            {"DE", "Germany", "950000", "6.1", "Automotive"},
            {"JP", "Japan", "800000", "4.3", "Technology"},
            {"GB", "United Kingdom", "750000", "5.2", "Financial Services"},
            {"FR", "France", "700000", "5.8", "Luxury Goods"},
            {"IT", "Italy", "650000", "6.4", "Fashion"},
            {"CA", "Canada", "600000", "2.8", "Natural Resources"},
            {"AU", "Australia", "550000", "3.9", "Mining"},
            {"BR", "Brazil", "500000", "9.8", "Agriculture"}
        };

        for (String[] data : mockData) {
            DashboardDataResponse.TopImportingCountry country = new DashboardDataResponse.TopImportingCountry(
                data[0], data[1], Long.valueOf(data[2]), 
                Double.valueOf(data[3]), data[4]
            );
            topImportingCountries.add(country);
        }
    }

    public DashboardDataResponse getCountrySpecificData(String countryCode) {
        // Get detailed data for a specific country
        List<DashboardDataResponse.CountryTariffData> countryData = new ArrayList<>();
        Map<String, Double> averageRates = new HashMap<>();
        Map<String, Integer> productCounts = new HashMap<>();
        List<DashboardDataResponse.TariffHeatmapData> heatmapData = new ArrayList<>();
        List<DashboardDataResponse.TopImportingCountry> topImportingCountries = new ArrayList<>();

        // Process only the specified country
        switch (countryCode.toUpperCase()) {
            case "US":
                processCountryData("US", usTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "CN":
                processCountryData("CN", chinaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "SG":
                processCountryData("SG", singaporeTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "GB":
                processCountryData("GB", ukTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "JP":
                processCountryData("JP", japanTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "KR":
                processCountryData("KR", southKoreaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "CA":
                processCountryData("CA", canadaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "AU":
                processCountryData("AU", australiaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "FR":
                processCountryData("FR", franceTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "IN":
                processCountryData("IN", indiaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "ID":
                processCountryData("ID", indonesiaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "IL":
                processCountryData("IL", israelTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "IT":
                processCountryData("IT", italyTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "MX":
                processCountryData("MX", mexicoTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "SA":
                processCountryData("SA", saudiArabiaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "ZA":
                processCountryData("ZA", southAfricaTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "TR":
                processCountryData("TR", turkeyTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
            case "BR":
                processCountryData("BR", brazilTariffRepository.findAll(), countryData, averageRates, productCounts);
                break;
        }

        // Generate heatmap data for this specific country
        generateHeatmapData(countryData, heatmapData);
        generateTopImportingCountries(topImportingCountries);

        return new DashboardDataResponse(countryData, averageRates, productCounts, heatmapData, topImportingCountries);
    }
}
