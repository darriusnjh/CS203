package com.tariff.app.entity;

import javax.persistence.*;

@Entity
@Table(name = "tariffrates_us")
public class USTariff implements Tariff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "hts8")
    private String hts8;

    @Column(name = "brief_description")
    private String briefDescription;

    @Column(name = "mfn_text_rate")
    private String mfnTextRate;

    @Column(name = "mfn_ad_val_rate")
    private Double mfnAdValRate;

    @Column(name = "mfn_specific_rate")
    private Double mfnSpecificRate;

    @Column(name = "mfn_other_rate")
    private Double mfnOtherRate;

    @Column(name = "col2_ad_val_rate")
    private Double col2AdValRate;

    @Column(name = "col2_specific_rate")
    private Double col2SpecificRate;

    @Column(name = "col2_other_rate")
    private Double col2OtherRate;

    // --- Jordan Specific Columns ---
    @Column(name = "jordan_indicator")
    private String jordanIndicator;

    @Column(name = "jordan_ad_val_rate")
    private Double jordanAdValRate;

    @Column(name = "jordan_specific_rate")
    private Double jordanSpecificRate;

    @Column(name = "jordan_other_rate")
    private Double jordanOtherRate;

    // --- Singapore Specific Columns ---
    @Column(name = "singapore_indicator")
    private String singaporeIndicator;

    @Column(name = "singapore_ad_val_rate")
    private Double singaporeAdValRate;

    @Column(name = "singapore_specific_rate")
    private Double singaporeSpecificRate;

    @Column(name = "singapore_other_rate")
    private Double singaporeOtherRate;

    // --- Australia Specific Columns ---
    @Column(name = "australia_indicator")
    private String australiaIndicator;

    @Column(name = "australia_ad_val_rate")
    private Double australiaAdValRate;

    @Column(name = "australia_specific_rate")
    private Double australiaSpecificRate;

    @Column(name = "australia_other_rate")
    private Double australiaOtherRate;

    // Default constructor
    public USTariff() {
    }

    // Constructor with parameters
    public USTariff(Long id, String hts8, String briefDescription, Double mfnAdValRate) {
        this.id = id;
        this.hts8 = hts8;
        this.briefDescription = briefDescription;
        this.mfnAdValRate = mfnAdValRate;
    }

    // Getters and setters
    // public Long getId() {
    // return id;
    // }

    // public void setId(Long id) {
    // this.id = id;
    // }

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

    public String getMfnTextRate() {
        String[] textRate = mfnTextRate.split(" ");
        String textRateString = "";
        if (textRate.length > 1) {
            textRateString = textRate[1];
        } else {
            textRateString = "";
        }
        return textRateString;
    }

    public void setMfnTextRate(String mfnTextRate) {
        this.mfnTextRate = mfnTextRate;
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

    public Double getCol2AdValRate() {
        return col2AdValRate;
    }

    public void setCol2AdValRate(Double col2AdValRate) {
        this.col2AdValRate = col2AdValRate;
    }

    public Double getCol2SpecificRate() {
        return col2SpecificRate;
    }

    public void setCol2SpecificRate(Double col2SpecificRate) {
        this.col2SpecificRate = col2SpecificRate;
    }

    public Double getCol2OtherRate() {
        return col2OtherRate;
    }

    public void setCol2OtherRate(Double col2OtherRate) {
        this.col2OtherRate = col2OtherRate;
    }

    public String getJordanIndicator() {
        return jordanIndicator;
    }

    public void setJordanIndicator(String jordanIndicator) {
        this.jordanIndicator = jordanIndicator;
    }

    public Double getJordanAdValRate() {
        return jordanAdValRate;
    }

    public void setJordanAdValRate(Double jordanAdValRate) {
        this.jordanAdValRate = jordanAdValRate;
    }

    public Double getJordanSpecificRate() {
        return jordanSpecificRate;
    }

    public void setJordanSpecificRate(Double jordanSpecificRate) {
        this.jordanSpecificRate = jordanSpecificRate;
    }

    public Double getJordanOtherRate() {
        return jordanOtherRate;
    }

    public void setJordanOtherRate(Double jordanOtherRate) {
        this.jordanOtherRate = jordanOtherRate;
    }

    public String getSingaporeIndicator() {
        return singaporeIndicator;
    }

    public void setSingaporeIndicator(String singaporeIndicator) {
        this.singaporeIndicator = singaporeIndicator;
    }

    public Double getSingaporeAdValRate() {
        return singaporeAdValRate;
    }

    public void setSingaporeAdValRate(Double singaporeAdValRate) {
        this.singaporeAdValRate = singaporeAdValRate;
    }

    public Double getSingaporeSpecificRate() {
        return singaporeSpecificRate;
    }

    public void setSingaporeSpecificRate(Double singaporeSpecificRate) {
        this.singaporeSpecificRate = singaporeSpecificRate;
    }

    public Double getSingaporeOtherRate() {
        return singaporeOtherRate;
    }

    public void setSingaporeOtherRate(Double singaporeOtherRate) {
        this.singaporeOtherRate = singaporeOtherRate;
    }

    public String getAustraliaIndicator() {
        return australiaIndicator;
    }

    public void setAustraliaIndicator(String australiaIndicator) {
        this.australiaIndicator = australiaIndicator;
    }

    public Double getAustraliaAdValRate() {
        return australiaAdValRate;
    }

    public void setAustraliaAdValRate(Double australiaAdValRate) {
        this.australiaAdValRate = australiaAdValRate;
    }

    public Double getAustraliaSpecificRate() {
        return australiaSpecificRate;
    }

    public void setAustraliaSpecificRate(Double australiaSpecificRate) {
        this.australiaSpecificRate = australiaSpecificRate;
    }

    public Double getAustraliaOtherRate() {
        return australiaOtherRate;
    }

    public void setAustraliaOtherRate(Double australiaOtherRate) {
        this.australiaOtherRate = australiaOtherRate;
    }
}
