package com.tariff.app.dto;

public class ProductTariffData {
    private String hts8;
    private String briefDescription;
    private Double mfnAdValRate;
    private Double mfnSpecificRate;
    private Double mfnOtherRate;
    private String rateType;
    private String productCategory;
    private String countryCode;

    public ProductTariffData() {}

    public ProductTariffData(String hts8, String briefDescription, Double mfnAdValRate, 
                           Double mfnSpecificRate, Double mfnOtherRate, String rateType, 
                           String productCategory, String countryCode) {
        this.hts8 = hts8;
        this.briefDescription = briefDescription;
        this.mfnAdValRate = mfnAdValRate;
        this.mfnSpecificRate = mfnSpecificRate;
        this.mfnOtherRate = mfnOtherRate;
        this.rateType = rateType;
        this.productCategory = productCategory;
        this.countryCode = countryCode;
    }

    // Getters and Setters
    public String getHts8() {
        return hts8;
    }

    public void setHts8(String hts8) {
        this.hts8 = hts8;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }

    public Double getMfnAdValRate() {
        return mfnAdValRate;
    }

    public void setMfnAdValRate(Double mfnAdValRate) {
        this.mfnAdValRate = mfnAdValRate;
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

    public String getRateType() {
        return rateType;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
}
