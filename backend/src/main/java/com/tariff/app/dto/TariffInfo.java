package com.tariff.app.dto;

public class TariffInfo {
    private String hts8;
    private String briefDescription;
    private String mfnTextRate;
    private Double mfnAdValRate;
    private Double mfnSpecificRate;
    private Double mfnOtherRate;

    public TariffInfo(String hts8, String briefDescription, String mfnTextRate, Double mfnAdValRate, Double mfnSpecificRate, Double mfnOtherRate) {
        this.hts8 = hts8;
        this.briefDescription = briefDescription;
        this.mfnTextRate = mfnTextRate;
        this.mfnAdValRate = mfnAdValRate;
        this.mfnSpecificRate = mfnSpecificRate;
        this.mfnOtherRate = mfnOtherRate;
    }

    public String getHts8() {
        return hts8;
    }
    
    public String getBriefDescription() {
        return briefDescription;
    }
    
    public String getMfnTextRate() {
        return mfnTextRate;
    }
    
    
    public Double getMfnAdValRate() {
        return mfnAdValRate;
    }
    
    public Double getMfnSpecificRate() {
        return mfnSpecificRate;
    }
    
    public Double getMfnOtherRate() {
        return mfnOtherRate;
    }
    
    public void setHts8(String hts8) {
        this.hts8 = hts8;
    }
    
    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }
    
    public void setMfnTextRate(String mfnTextRate) {
        this.mfnTextRate = mfnTextRate;
    }
    
    public void setMfnAdValRate(Double mfnAdValRate) {
        this.mfnAdValRate = mfnAdValRate;
    }
    
    public void setMfnSpecificRate(Double mfnSpecificRate) {
        this.mfnSpecificRate = mfnSpecificRate;
    }
    
    public void setMfnOtherRate(Double mfnOtherRate) {
        this.mfnOtherRate = mfnOtherRate;
    }
}
