package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.modal.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Value("${secret.key}")
    private String SECRET_KEY;
    public String generateToken(User user){
        Map<Object,Object>claims=new HashMap<>();
        claims.put("role","ROLE_"+user.getRole());
        claims.put("name",user.getName());
        return Jwts.builder()
                .header()
                .type("JWT")
                .and()
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000L*30*30*60*60))
                .compact();
    }
    public Claims verifyTokenAndGetClaims(String token){
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String getEmail(String token){
        return verifyTokenAndGetClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token){
        return verifyTokenAndGetClaims(token).getExpiration().before(new Date(System.currentTimeMillis()));
    }

}
