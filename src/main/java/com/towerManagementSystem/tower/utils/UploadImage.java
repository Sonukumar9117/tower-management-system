package com.towerManagementSystem.tower.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.towerManagementSystem.tower.exception.ImageException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

public class UploadImage {

    private static String uploadDir="src\\main\\java/com\\towerManagementSystem\\tower\\images";
    public static void uploadImage(MultipartFile file, String currentFileName)throws ImageException{
        try{
            System.out.println(file+"This is file");
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
    public static String uploadImageOnCloudinary(Cloudinary cloudinary, MultipartFile file){
        try{
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public boolean saveImageLocally(){
        return true;
    }
}
