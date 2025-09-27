package com.tariff.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChangePasswordRequest {
    
    @JsonProperty("currentPassword")
    private String currentPassword;
    
    @JsonProperty("newPassword")
    private String newPassword;
    
    public ChangePasswordRequest() {}
    
    public ChangePasswordRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
    
    public String getCurrentPassword() {
        return currentPassword;
    }
    
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
    
    public String getNewPassword() {
        return newPassword;
    }
    
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
