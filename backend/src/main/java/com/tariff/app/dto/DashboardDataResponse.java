package com.tariff.app.dto;

import java.util.List;
import java.util.Map;

public class DashboardDataResponse {
    private List<CountryTariffData> countryData;
    private Map<String, Double> averageRates;
    private Map<String, Integer> productCounts;
    private List<TariffHeatmapData> heatmapData;
    private List<TopImportingCountry> topImportingCountries;

    public DashboardDataResponse() {}

    public DashboardDataResponse(List<CountryTariffData> countryData, 
                                Map<String, Double> averageRates,
                                Map<String, Integer> productCounts,
                                List<TariffHeatmapData> heatmapData,
                                List<TopImportingCountry> topImportingCountries) {
        this.countryData = countryData;
        this.averageRates = averageRates;
        this.productCounts = productCounts;
        this.heatmapData = heatmapData;
        this.topImportingCountries = topImportingCountries;
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

        public CountryTariffData() {}

        public CountryTariffData(String countryCode, String countryName, Double averageMfnRate, 
                               Double averageAdValRate, Double averageSpecificRate, 
                               Integer totalProducts, Double maxRate, Double minRate) {
            this.countryCode = countryCode;
            this.countryName = countryName;
            this.averageMfnRate = averageMfnRate;
            this.averageAdValRate = averageAdValRate;
            this.averageSpecificRate = averageSpecificRate;
            this.totalProducts = totalProducts;
            this.maxRate = maxRate;
            this.minRate = minRate;
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
}
