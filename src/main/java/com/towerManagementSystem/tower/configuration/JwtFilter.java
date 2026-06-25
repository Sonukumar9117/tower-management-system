package com.towerManagementSystem.tower.configuration;

import com.towerManagementSystem.tower.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@RequiredArgsConstructor
@Configuration
public class JwtFilter extends OncePerRequestFilter {
    private  final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    @Autowired
    @Qualifier("handlerExceptionResolver")
    private   HandlerExceptionResolver exceptionResolver;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            if(SecurityContextHolder.getContext().getAuthentication()!=null){
                filterChain.doFilter(request,response);
                return;
            }
            String authHeader=request.getHeader("Authorization");
            if(authHeader!=null && authHeader.startsWith("Bearer ")  ){
                String token=authHeader.substring(7);
                Claims claims= jwtService.verifyTokenAndGetClaims(token);
                String email=claims.getSubject();
                UserDetails userDetails= userDetailsService.loadUserByUsername(email);

                if(!jwtService.isTokenExpired(token)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
                else throw new JwtException("Token expired.");
            }
            filterChain.doFilter(request,response);
        }
        catch (JwtException exception){
            exceptionResolver.resolveException(request,response,null,exception);
        }
    }
}
