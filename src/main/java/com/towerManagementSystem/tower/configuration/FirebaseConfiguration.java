package com.towerManagementSystem.tower.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfiguration {
    @Bean
    public FirebaseApp firebaseConfig() throws IOException {
        System.out.println("Initializing Firebase...");
        FileInputStream serviceAccount =
                //when running on local
                new FileInputStream("D:\\tower-management-system\\service-account.json");
        //when running on production
//        new FileInputStream("/etc/secrets/service-account.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        }

        return FirebaseApp.getInstance();
    }
}
