package com.tariff.app.dto;

public class TariffCalculationRequest {
    private Long hts8;
    private Double itemValue;
    private Double itemQuantity;
    private String originCountry;
    
    // Default constructor
    public TariffCalculationRequest() {}
    
    // Constructor with parameters
    public TariffCalculationRequest(Long hts8, Double itemValue, Double itemQuantity, String originCountry) {
        this.hts8 = hts8;
        this.itemValue = itemValue;
        this.itemQuantity = itemQuantity;
        this.originCountry = originCountry;
    }

    
    // Getters and setters
    public Long getHts8() {
        return hts8;
    }
    
    public void setHts8(Long hts8) {
        this.hts8 = hts8;
    }
    
    public Double getItemValue() {
        return itemValue;
    }
    
    public void setItemValue(Double itemValue) {
        this.itemValue = itemValue;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public Double getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Double itemQuantity) {
        this.itemQuantity = itemQuantity;
    }
}

