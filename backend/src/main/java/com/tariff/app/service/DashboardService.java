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

        // Generate top importing countries based on real data
        generateTopImportingCountries(topImportingCountries, countryData);

        return new DashboardDataResponse(countryData, averageRates, productCounts, heatmapData, topImportingCountries);
    }

    private void processCountryData(String countryCode, List<? extends Tariff> tariffs, 
                                  List<DashboardDataResponse.CountryTariffData> countryData,
                                  Map<String, Double> averageRates,
                                  Map<String, Integer> productCounts) {
        if (tariffs.isEmpty()) return;

        List<Double> mfnAdValRates = new ArrayList<>();
        List<Double> mfnSpecificRates = new ArrayList<>();
        List<Double> mfnOtherRates = new ArrayList<>();
        List<Double> allRates = new ArrayList<>();

        for (Tariff tariff : tariffs) {
            // Collect MFN Ad Valorem rates (filter out unrealistic values)
            if (tariff.getMfnAdValRate() != null && tariff.getMfnAdValRate() > 0 && tariff.getMfnAdValRate() <= 100) {
                mfnAdValRates.add(tariff.getMfnAdValRate());
                allRates.add(tariff.getMfnAdValRate());
            }
            
            // Collect MFN Specific rates (filter out unrealistic values)
            if (tariff.getMfnSpecificRate() != null && tariff.getMfnSpecificRate() > 0 && tariff.getMfnSpecificRate() <= 1000) {
                mfnSpecificRates.add(tariff.getMfnSpecificRate());
                allRates.add(tariff.getMfnSpecificRate());
            }
            
            // Collect MFN Other rates (filter out unrealistic values)
            if (tariff.getMfnOtherRate() != null && tariff.getMfnOtherRate() > 0 && tariff.getMfnOtherRate() <= 100) {
                mfnOtherRates.add(tariff.getMfnOtherRate());
                allRates.add(tariff.getMfnOtherRate());
            }
        }

        if (!allRates.isEmpty()) {
            // Calculate averages from actual data
            double avgMfnAdVal = mfnAdValRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            double avgMfnSpecific = mfnSpecificRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            double avgMfnOther = mfnOtherRates.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            
            // Overall average rate - prioritize ad valorem rates for more realistic values
            double avgMfn;
            if (!mfnAdValRates.isEmpty()) {
                avgMfn = avgMfnAdVal; // Use ad valorem rates as primary
            } else if (!mfnSpecificRates.isEmpty()) {
                avgMfn = Math.min(avgMfnSpecific / 100.0, 50.0); // Convert specific rates to percentage
            } else {
                avgMfn = avgMfnOther;
            }
            
            double maxRate = allRates.stream().mapToDouble(Double::doubleValue).max().orElse(0.0);
            double minRate = allRates.stream().mapToDouble(Double::doubleValue).min().orElse(0.0);

            String countryName = countryNames.getOrDefault(countryCode, countryCode);
            
            DashboardDataResponse.CountryTariffData data = new DashboardDataResponse.CountryTariffData(
                countryCode, countryName, avgMfn, avgMfnAdVal, avgMfnSpecific, 
                tariffs.size(), maxRate, minRate
            );
            
            countryData.add(data);
            averageRates.put(countryCode, avgMfn);
            productCounts.put(countryCode, tariffs.size());
        }
    }

    private void generateHeatmapData(List<DashboardDataResponse.CountryTariffData> countryData,
                                   List<DashboardDataResponse.TariffHeatmapData> heatmapData) {
        // Generate heatmap data based on actual tariff rates from database
        for (DashboardDataResponse.CountryTariffData origin : countryData) {
            for (DashboardDataResponse.CountryTariffData destination : countryData) {
                if (!origin.getCountryCode().equals(destination.getCountryCode())) {
                    // Use actual tariff rates from destination country
                    double baseRate = destination.getAverageMfnRate();
                    
                    // Apply trade relationship multipliers for special rates
                    double relationshipMultiplier = getRelationshipMultiplier(origin.getCountryCode(), destination.getCountryCode());
                    double finalRate = baseRate * relationshipMultiplier;
                    
                    // Ensure rate is reasonable (not too high)
                    if (finalRate > 100) {
                        finalRate = Math.min(finalRate, 50.0); // Cap at 50%
                    }
                    
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
        if (rate <= 20.0) return "High";
        return "Very High";
    }

    private void generateTopImportingCountries(List<DashboardDataResponse.TopImportingCountry> topImportingCountries, 
                                             List<DashboardDataResponse.CountryTariffData> countryData) {
        // Generate top importing countries based on actual data from countryData
        // Sort countries by total products and take top 10
        List<DashboardDataResponse.CountryTariffData> sortedCountries = countryData.stream()
            .sorted((a, b) -> Integer.compare(b.getTotalProducts(), a.getTotalProducts()))
            .limit(10)
            .collect(Collectors.toList());

        for (DashboardDataResponse.CountryTariffData country : sortedCountries) {
            // Determine primary import category based on average tariff rate
            String category = determineImportCategory(country.getAverageMfnRate());
            
            // Estimate import volume based on product count and average rate
            long estimatedImports = (long) (country.getTotalProducts() * 1000 * (1.0 / (1.0 + country.getAverageMfnRate() / 100.0)));
            
            DashboardDataResponse.TopImportingCountry topCountry = new DashboardDataResponse.TopImportingCountry(
                country.getCountryCode(),
                country.getCountryName(),
                estimatedImports,
                country.getAverageMfnRate(),
                category
            );
            topImportingCountries.add(topCountry);
        }
    }

    private String determineImportCategory(double averageRate) {
        if (averageRate <= 3) return "Electronics";
        if (averageRate <= 6) return "Technology";
        if (averageRate <= 10) return "Manufacturing";
        if (averageRate <= 15) return "Automotive";
        return "Agriculture";
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
        generateTopImportingCountries(topImportingCountries, countryData);

        return new DashboardDataResponse(countryData, averageRates, productCounts, heatmapData, topImportingCountries);
    }
}
