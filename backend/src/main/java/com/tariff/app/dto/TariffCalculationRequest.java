package com.tariff.app.dto;

public class TariffCalculationRequest {
    private String hts8;
    private Double itemValue;
    private Double itemQuantity;
    private String originCountry;
    private String countryOfArrival;
    private String modeOfTransport;
    private String entryDate;
    private String loadingDate;
    
    // Default constructor
    public TariffCalculationRequest() {}
    
    // Constructor with parameters
    public TariffCalculationRequest(String hts8, Double itemValue, Double itemQuantity, String originCountry, String countryOfArrival, String modeOfTransport, String entryDate, String loadingDate) {
        this.hts8 = hts8;
        this.itemValue = itemValue;
        this.itemQuantity = itemQuantity;
        this.originCountry = originCountry;
        this.countryOfArrival = countryOfArrival;
        this.modeOfTransport = modeOfTransport;
        this.entryDate = entryDate;
        this.loadingDate = loadingDate;
    }

    
    // Getters and setters
    public String getHts8() {
        return hts8;
    }
    
    public void setHts8(String hts8) {
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

    public String getCountryOfArrival() {
        return countryOfArrival;
    }

    public void setCountryOfArrival(String countryOfArrival) {
        this.countryOfArrival = countryOfArrival;
    }

    public String getModeOfTransport() {
        return modeOfTransport;
    }

    public void setModeOfTransport(String modeOfTransport) {
        this.modeOfTransport = modeOfTransport;
    }

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        this.entryDate = entryDate;
    }

    public String getLoadingDate() {
        return loadingDate;
    }

    public void setLoadingDate(String loadingDate) {
        this.loadingDate = loadingDate;
    }
}

