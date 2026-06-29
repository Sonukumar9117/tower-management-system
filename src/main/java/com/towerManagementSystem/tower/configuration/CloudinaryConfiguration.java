package com.towerManagementSystem.tower.configuration;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfiguration {
    @Value("${cloud.url}")
    private String cloudinaryUrl;
    @Bean
    public Cloudinary getCloudinary(){
        Cloudinary cloudinary=new Cloudinary(cloudinaryUrl);
        System.out.println(cloudinary.config.cloudName+"Your cloud name.");
        return cloudinary;
    }
}
