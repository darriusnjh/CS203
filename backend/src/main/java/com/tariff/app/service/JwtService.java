package com.tariff.app.service;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.http.ResponseCookie;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtService {

    private static long expirationMillis = 36000000;
    private static String secret = "aWRrIG1hbiB0aGlzIGlzIGEgdmVyeSBnb29kIHRlc3QgLSBhbnNvbiBrb2ggZ3Vhbmcgd2Vp";
    private static SecretKey key = Keys.hmacShaKeyFor(
            Base64.getDecoder().decode(secret));

    public static String createJwt(String username, String secretKey) {
        // do not push secret key

        return Jwts.builder().subject(username).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public static ResponseCookie createJwtCookie(String jwt) {
        // ResponseCookie cookie = ResponseCookie.from("jwt", jwt).build();
        ResponseCookie cookie = ResponseCookie.from("jwt", jwt).path("/").httpOnly(true).secure(true)
                .maxAge(expirationMillis / 1000)
                .sameSite("None").build();
        // ResponseCookie cookie = ResponseCookie.from("jwt",
        // jwt).path("/").httpOnly(true).secure(true)
        // .maxAge(expirationMillis / 1000)
        // .sameSite("Strict").build();
        return cookie;
    }

    public static ResponseCookie createEmptyCookie() {

        ResponseCookie cookie = ResponseCookie.from("jwt", "").path("/").httpOnly(true).secure(true).maxAge(0)
                .sameSite("None").build();

        // ResponseCookie cookie = ResponseCookie.from("jwt",
        // "").path("/").httpOnly(true).secure(true).maxAge(0)
        // .sameSite("Strict").build();

        return cookie;
    }

    public static Claims validateJwtandReturnClaim(String jwtString) {

        try {
            Claims claim = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtString).getPayload();
            return claim;
            // im assuming token is valid here
        } catch (JwtException e) {
            // token invalid
            return null;
        }

    }

    public static boolean validateJwt(String jwtString) {
        try {
            Claims claim = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtString).getPayload();
            return true;
            // im assuming token is valid here
        } catch (JwtException e) {
            // token invalid
            return false;
        }
    }

    public static String extractUsername(String jwtString) {
        try {
            Claims claim = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtString).getPayload();
            return claim.getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
}
