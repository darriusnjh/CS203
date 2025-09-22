package com.tariff.app.entity;

/**
 * Common interface for all tariff entities
 */
public interface Tariff {
    
    String getHts8();
    void setHts8(String hts8);
    
    String getBriefDescription();
    void setBriefDescription(String briefDescription);
    
    String getMfnTextRate();
    void setMfnTextRate(String mfnTextRate);
    
    Double getMfnAdValRate();
    void setMfnAdValRate(Double mfnAdValRate);
    
    Double getMfnSpecificRate();
    void setMfnSpecificRate(Double mfnSpecificRate);
    
    Double getMfnOtherRate();
    void setMfnOtherRate(Double mfnOtherRate);

    Double getCol2AdValRate();
    void setCol2AdValRate(Double col2AdValRate);

    Double getCol2SpecificRate();
    void setCol2SpecificRate(Double col2SpecificRate);

    Double getCol2OtherRate();
    void setCol2OtherRate(Double col2OtherRate);

    Double getJordanAdValRate();
    void setJordanAdValRate(Double jordanAdValRate);

    Double getJordanSpecificRate();
    void setJordanSpecificRate(Double jordanSpecificRate);

    Double getJordanOtherRate();
    void setJordanOtherRate(Double jordanOtherRate);

    Double getSingaporeAdValRate();
    void setSingaporeAdValRate(Double singaporeAdValRate);

    Double getSingaporeSpecificRate();
    void setSingaporeSpecificRate(Double singaporeSpecificRate);

    Double getSingaporeOtherRate();
    void setSingaporeOtherRate(Double singaporeOtherRate);

    Double getAustraliaAdValRate();
    void setAustraliaAdValRate(Double australiaAdValRate);

    Double getAustraliaSpecificRate();
    void setAustraliaSpecificRate(Double australiaSpecificRate);

    Double getAustraliaOtherRate();
    void setAustraliaOtherRate(Double australiaOtherRate);

    String getJordanIndicator();
    void setJordanIndicator(String jordanIndicator);

    String getSingaporeIndicator();
    void setSingaporeIndicator(String singaporeIndicator);

    String getAustraliaIndicator();
    void setAustraliaIndicator(String australiaIndicator);
}
