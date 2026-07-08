package com.towerManagementSystem.tower.exceptionHandler;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.towerManagementSystem.tower.dto.ErrorResponse;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.exception.ImageException;
import io.jsonwebtoken.JwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ImageException.class)
    public ResponseEntity<ErrorResponse> handleImageError(ImageException imageException){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("image",imageException.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Validation error")
                .message(imageException.getMessage())
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleValidationError(CustomException customException){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",customException.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Validation error")
                .message(customException.getMessage())
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityError(DataIntegrityViolationException ex){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",ex.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Validation error")
                .message("Duplicate entry")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleBadCredentialsError(Exception badCredentialsException){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",badCredentialsException.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Authorization error")
                .message("Bad credential")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse>handleJwtError(JwtException jwtException){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",jwtException.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Authorization error")
                .message("Jwt verification failed")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ErrorResponse>handleAuthorizationDeniedAccess(AuthorizationDeniedException jwtException){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",jwtException.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Authorization error")
                .message("You are not authorized to access it.")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.FORBIDDEN.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<ErrorResponse>handle(HttpServerErrorException.InternalServerError serverError){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",serverError.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Internal Server Error")
                .message("Internal server error.")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(FirebaseMessagingException.class)
    public  ResponseEntity<ErrorResponse>pushNotificationError(FirebaseMessagingException ex){
        Map<Object, Object>errors=new HashMap<>();
        errors.put("error",ex.getMessage());
        ErrorResponse errorResponse=ErrorResponse.builder()
                .errors(errors)
                .type("Broadcast notification failed")
                .message(ex.getMessage())
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
