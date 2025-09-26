package com.tariff.app.dto;

import java.util.List;
import java.util.Map;

public class DashboardDataResponse {
    private List<CountryTariffData> countryData;
    private Map<String, Double> averageRates;
    private Map<String, Integer> productCounts;
    private List<TariffHeatmapData> heatmapData;
    private List<TopImportingCountry> topImportingCountries;
    private List<TradeAgreementInsight> tradeAgreementInsights;
    private List<ProductCategoryInsight> productCategoryInsights;
    private List<TariffTrendInsight> tariffTrendInsights;

    public DashboardDataResponse() {}

    public DashboardDataResponse(List<CountryTariffData> countryData, 
                                Map<String, Double> averageRates,
                                Map<String, Integer> productCounts,
                                List<TariffHeatmapData> heatmapData,
                                List<TopImportingCountry> topImportingCountries,
                                List<TradeAgreementInsight> tradeAgreementInsights,
                                List<ProductCategoryInsight> productCategoryInsights,
                                List<TariffTrendInsight> tariffTrendInsights) {
        this.countryData = countryData;
        this.averageRates = averageRates;
        this.productCounts = productCounts;
        this.heatmapData = heatmapData;
        this.topImportingCountries = topImportingCountries;
        this.tradeAgreementInsights = tradeAgreementInsights;
        this.productCategoryInsights = productCategoryInsights;
        this.tariffTrendInsights = tariffTrendInsights;
    }

    // Getters and setters
    public List<CountryTariffData> getCountryData() {
        return countryData;
    }

    public void setCountryData(List<CountryTariffData> countryData) {
        this.countryData = countryData;
    }

    public Map<String, Double> getAverageRates() {
        return averageRates;
    }

    public void setAverageRates(Map<String, Double> averageRates) {
        this.averageRates = averageRates;
    }

    public Map<String, Integer> getProductCounts() {
        return productCounts;
    }

    public void setProductCounts(Map<String, Integer> productCounts) {
        this.productCounts = productCounts;
    }

    public List<TariffHeatmapData> getHeatmapData() {
        return heatmapData;
    }

    public void setHeatmapData(List<TariffHeatmapData> heatmapData) {
        this.heatmapData = heatmapData;
    }

    public List<TopImportingCountry> getTopImportingCountries() {
        return topImportingCountries;
    }

    public void setTopImportingCountries(List<TopImportingCountry> topImportingCountries) {
        this.topImportingCountries = topImportingCountries;
    }

    public static class CountryTariffData {
        private String countryCode;
        private String countryName;
        private Double averageMfnRate;
        private Double averageAdValRate;
        private Double averageSpecificRate;
        private Integer totalProducts;
        private Double maxRate;
        private Double minRate;
        private Integer freeTradeProducts;
        private Integer highTariffProducts;
        private Double tradeAgreementCoverage;
        private String topProductCategory;

        public CountryTariffData() {}

        public CountryTariffData(String countryCode, String countryName, Double averageMfnRate, 
                               Double averageAdValRate, Double averageSpecificRate, 
                               Integer totalProducts, Double maxRate, Double minRate,
                               Integer freeTradeProducts, Integer highTariffProducts,
                               Double tradeAgreementCoverage, String topProductCategory) {
            this.countryCode = countryCode;
            this.countryName = countryName;
            this.averageMfnRate = averageMfnRate;
            this.averageAdValRate = averageAdValRate;
            this.averageSpecificRate = averageSpecificRate;
            this.totalProducts = totalProducts;
            this.maxRate = maxRate;
            this.minRate = minRate;
            this.freeTradeProducts = freeTradeProducts;
            this.highTariffProducts = highTariffProducts;
            this.tradeAgreementCoverage = tradeAgreementCoverage;
            this.topProductCategory = topProductCategory;
        }

        // Getters and setters
        public String getCountryCode() { return countryCode; }
        public void setCountryCode(String countryCode) { this.countryCode = countryCode; }
        
        public String getCountryName() { return countryName; }
        public void setCountryName(String countryName) { this.countryName = countryName; }
        
        public Double getAverageMfnRate() { return averageMfnRate; }
        public void setAverageMfnRate(Double averageMfnRate) { this.averageMfnRate = averageMfnRate; }
        
        public Double getAverageAdValRate() { return averageAdValRate; }
        public void setAverageAdValRate(Double averageAdValRate) { this.averageAdValRate = averageAdValRate; }
        
        public Double getAverageSpecificRate() { return averageSpecificRate; }
        public void setAverageSpecificRate(Double averageSpecificRate) { this.averageSpecificRate = averageSpecificRate; }
        
        public Integer getTotalProducts() { return totalProducts; }
        public void setTotalProducts(Integer totalProducts) { this.totalProducts = totalProducts; }
        
        public Double getMaxRate() { return maxRate; }
        public void setMaxRate(Double maxRate) { this.maxRate = maxRate; }
        
        public Double getMinRate() { return minRate; }
        public void setMinRate(Double minRate) { this.minRate = minRate; }
        
        public Integer getFreeTradeProducts() { return freeTradeProducts; }
        public void setFreeTradeProducts(Integer freeTradeProducts) { this.freeTradeProducts = freeTradeProducts; }
        
        public Integer getHighTariffProducts() { return highTariffProducts; }
        public void setHighTariffProducts(Integer highTariffProducts) { this.highTariffProducts = highTariffProducts; }
        
        public Double getTradeAgreementCoverage() { return tradeAgreementCoverage; }
        public void setTradeAgreementCoverage(Double tradeAgreementCoverage) { this.tradeAgreementCoverage = tradeAgreementCoverage; }
        
        public String getTopProductCategory() { return topProductCategory; }
        public void setTopProductCategory(String topProductCategory) { this.topProductCategory = topProductCategory; }
    }

    public static class TariffHeatmapData {
        private String originCountry;
        private String destinationCountry;
        private Double averageRate;
        private Integer productCount;
        private String rateCategory;

        public TariffHeatmapData() {}

        public TariffHeatmapData(String originCountry, String destinationCountry, 
                               Double averageRate, Integer productCount, String rateCategory) {
            this.originCountry = originCountry;
            this.destinationCountry = destinationCountry;
            this.averageRate = averageRate;
            this.productCount = productCount;
            this.rateCategory = rateCategory;
        }

        // Getters and setters
        public String getOriginCountry() { return originCountry; }
        public void setOriginCountry(String originCountry) { this.originCountry = originCountry; }
        
        public String getDestinationCountry() { return destinationCountry; }
        public void setDestinationCountry(String destinationCountry) { this.destinationCountry = destinationCountry; }
        
        public Double getAverageRate() { return averageRate; }
        public void setAverageRate(Double averageRate) { this.averageRate = averageRate; }
        
        public Integer getProductCount() { return productCount; }
        public void setProductCount(Integer productCount) { this.productCount = productCount; }
        
        public String getRateCategory() { return rateCategory; }
        public void setRateCategory(String rateCategory) { this.rateCategory = rateCategory; }
    }

    public static class TopImportingCountry {
        private String countryCode;
        private String countryName;
        private Long totalImports;
        private Double averageTariffRate;
        private String primaryImportCategory;

        public TopImportingCountry() {}

        public TopImportingCountry(String countryCode, String countryName, Long totalImports, 
                                 Double averageTariffRate, String primaryImportCategory) {
            this.countryCode = countryCode;
            this.countryName = countryName;
            this.totalImports = totalImports;
            this.averageTariffRate = averageTariffRate;
            this.primaryImportCategory = primaryImportCategory;
        }

        // Getters and setters
        public String getCountryCode() { return countryCode; }
        public void setCountryCode(String countryCode) { this.countryCode = countryCode; }
        
        public String getCountryName() { return countryName; }
        public void setCountryName(String countryName) { this.countryName = countryName; }
        
        public Long getTotalImports() { return totalImports; }
        public void setTotalImports(Long totalImports) { this.totalImports = totalImports; }
        
        public Double getAverageTariffRate() { return averageTariffRate; }
        public void setAverageTariffRate(Double averageTariffRate) { this.averageTariffRate = averageTariffRate; }
        
        public String getPrimaryImportCategory() { return primaryImportCategory; }
        public void setPrimaryImportCategory(String primaryImportCategory) { this.primaryImportCategory = primaryImportCategory; }
    }

    public static class TradeAgreementInsight {
        private String agreementName;
        private String country1;
        private String country2;
        private Integer productsCovered;
        private Double averageRateReduction;
        private Double tradeVolumeImpact;

        public TradeAgreementInsight() {}

        public TradeAgreementInsight(String agreementName, String country1, String country2, 
                                   Integer productsCovered, Double averageRateReduction, Double tradeVolumeImpact) {
            this.agreementName = agreementName;
            this.country1 = country1;
            this.country2 = country2;
            this.productsCovered = productsCovered;
            this.averageRateReduction = averageRateReduction;
            this.tradeVolumeImpact = tradeVolumeImpact;
        }

        // Getters and setters
        public String getAgreementName() { return agreementName; }
        public void setAgreementName(String agreementName) { this.agreementName = agreementName; }
        
        public String getCountry1() { return country1; }
        public void setCountry1(String country1) { this.country1 = country1; }
        
        public String getCountry2() { return country2; }
        public void setCountry2(String country2) { this.country2 = country2; }
        
        public Integer getProductsCovered() { return productsCovered; }
        public void setProductsCovered(Integer productsCovered) { this.productsCovered = productsCovered; }
        
        public Double getAverageRateReduction() { return averageRateReduction; }
        public void setAverageRateReduction(Double averageRateReduction) { this.averageRateReduction = averageRateReduction; }
        
        public Double getTradeVolumeImpact() { return tradeVolumeImpact; }
        public void setTradeVolumeImpact(Double tradeVolumeImpact) { this.tradeVolumeImpact = tradeVolumeImpact; }
    }

    public static class ProductCategoryInsight {
        private String category;
        private String country;
        private Integer productCount;
        private Double averageRate;
        private Double rateRange;
        private String topHtsCode;

        public ProductCategoryInsight() {}

        public ProductCategoryInsight(String category, String country, Integer productCount, 
                                    Double averageRate, Double rateRange, String topHtsCode) {
            this.category = category;
            this.country = country;
            this.productCount = productCount;
            this.averageRate = averageRate;
            this.rateRange = rateRange;
            this.topHtsCode = topHtsCode;
        }

        // Getters and setters
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        
        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }
        
        public Integer getProductCount() { return productCount; }
        public void setProductCount(Integer productCount) { this.productCount = productCount; }
        
        public Double getAverageRate() { return averageRate; }
        public void setAverageRate(Double averageRate) { this.averageRate = averageRate; }
        
        public Double getRateRange() { return rateRange; }
        public void setRateRange(Double rateRange) { this.rateRange = rateRange; }
        
        public String getTopHtsCode() { return topHtsCode; }
        public void setTopHtsCode(String topHtsCode) { this.topHtsCode = topHtsCode; }
    }

    public static class TariffTrendInsight {
        private String country;
        private String trend;
        private Double changePercentage;
        private String description;
        private String recommendation;

        public TariffTrendInsight() {}

        public TariffTrendInsight(String country, String trend, Double changePercentage, 
                                String description, String recommendation) {
            this.country = country;
            this.trend = trend;
            this.changePercentage = changePercentage;
            this.description = description;
            this.recommendation = recommendation;
        }

        // Getters and setters
        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }
        
        public String getTrend() { return trend; }
        public void setTrend(String trend) { this.trend = trend; }
        
        public Double getChangePercentage() { return changePercentage; }
        public void setChangePercentage(Double changePercentage) { this.changePercentage = changePercentage; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
    }

    // Getters and setters for new fields
    public List<TradeAgreementInsight> getTradeAgreementInsights() { return tradeAgreementInsights; }
    public void setTradeAgreementInsights(List<TradeAgreementInsight> tradeAgreementInsights) { this.tradeAgreementInsights = tradeAgreementInsights; }
    
    public List<ProductCategoryInsight> getProductCategoryInsights() { return productCategoryInsights; }
    public void setProductCategoryInsights(List<ProductCategoryInsight> productCategoryInsights) { this.productCategoryInsights = productCategoryInsights; }
    
    public List<TariffTrendInsight> getTariffTrendInsights() { return tariffTrendInsights; }
    public void setTariffTrendInsights(List<TariffTrendInsight> tariffTrendInsights) { this.tariffTrendInsights = tariffTrendInsights; }
}
