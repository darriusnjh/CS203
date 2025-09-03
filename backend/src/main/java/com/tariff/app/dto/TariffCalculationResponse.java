package com.tariff.app.dto;
import java.util.ArrayList;

public class TariffCalculationResponse {
    private Long hts8;
    private String briefDescription;
    private Double itemValue;
    private Double mfnAdValRate;
    private Double mfnSpecificRate;
    private Double mfnOtherRate;
    private Double tariffAmount;
    private Double totalCost;
    private boolean tariffFound;
    private Double itemQuantity;
    private String originCountry;
    private Double totalTariffPercentage;
    private ArrayList<String> dutyTypes;
    
    // Default constructor
    public TariffCalculationResponse() {}
    
    // Constructor with parameters
    public TariffCalculationResponse(Long hts8, String briefDescription, Double itemValue, 
                                   Double itemQuantity, String originCountry, Double mfnAdValRate, Double mfnSpecificRate, Double mfnOtherRate, Double tariffAmount, Double totalCost, boolean tariffFound, Double totalTariffPercentage, ArrayList<String> dutyTypes) {
        this.hts8 = hts8;
        this.briefDescription = briefDescription;
        this.itemValue = itemValue;
        this.itemQuantity = itemQuantity;
        this.originCountry = originCountry;
        this.mfnAdValRate = mfnAdValRate;
        this.mfnSpecificRate = mfnSpecificRate;
        this.mfnOtherRate = mfnOtherRate;
        this.tariffAmount = tariffAmount;
        this.totalCost = totalCost;
        this.tariffFound = tariffFound;
        this.totalTariffPercentage = totalTariffPercentage;
        this.dutyTypes = dutyTypes;
    }
    
    // Getters and setters
    public Long getHts8() {
        return hts8;
    }
    
    public void setHts8(Long hts8) {
        this.hts8 = hts8;
    }
    
    public String getBriefDescription() {
        return briefDescription;
    }
    
    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }
    
    public Double getItemValue() {
        return itemValue;
    }
    
    public void setItemValue(Double itemValue) {
        this.itemValue = itemValue;
    }
    
    public Double getMfnAdValRate() {
        return mfnAdValRate;
    }
    
    public void setMfnAdValRate(Double mfnAdValRate) {
        this.mfnAdValRate = mfnAdValRate;
    }
    
    public Double getTariffAmount() {
        return tariffAmount;
    }
    
    public void setTariffAmount(Double tariffAmount) {
        this.tariffAmount = tariffAmount;
    }
    
    public Double getTotalCost() {
        return totalCost;
    }
    
    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }
    
    public boolean isTariffFound() {
        return tariffFound;
    }
    
    public void setTariffFound(boolean tariffFound) {
        this.tariffFound = tariffFound;
    }

    public Double getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Double itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public Double getMfnSpecificRate() {
        return mfnSpecificRate;
    }

    public void setMfnSpecificRate(Double mfnSpecificRate) {
        this.mfnSpecificRate = mfnSpecificRate;
    }

    public Double getMfnOtherRate() {
        return mfnOtherRate;
    }

    public void setMfnOtherRate(Double mfnOtherRate) {
        this.mfnOtherRate = mfnOtherRate;
    }

    public Double getTotalTariffPercentage() {
        return totalTariffPercentage;
    }

    public void setTotalTariffPercentage(Double totalTariffPercentage) {
        this.totalTariffPercentage = totalTariffPercentage;
    }

    public ArrayList<String> getDutyTypes() {
        return dutyTypes;
    }

    public void setDutyTypes(ArrayList<String> dutyTypes) {
        this.dutyTypes = dutyTypes;
    }
}

