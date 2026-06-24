package com.towerManagementSystem.tower.utils;

import com.towerManagementSystem.tower.exception.ImageException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class UploadImage {

    private static String uploadDir="E:\\tower\\tower\\src\\main\\java\\com\\towerManagementSystem\\tower\\images";
    public static void uploadImage(MultipartFile file, String currentFileName)throws ImageException{
        try{
            String imageType= file.getContentType();
            Path uploadPath= Paths.get(uploadDir);
            if(!Files.exists(uploadPath)){
                Files.createDirectory(uploadPath);
            }
            Path filePath=uploadPath.resolve(currentFileName);
            Files.copy(file.getInputStream(),filePath, StandardCopyOption.REPLACE_EXISTING);
            generateImageUrl(currentFileName);
        } catch (IOException e) {
           throw new ImageException(e.getMessage());
        }
    }

    public static String generateImageUrl(String imageName){
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/")
                .path(imageName)
                .build()
                .toString();
    }
    public boolean saveImageLocally(){
        return true;
    }
}
