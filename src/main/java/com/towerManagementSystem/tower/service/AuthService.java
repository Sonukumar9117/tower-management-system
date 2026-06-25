package com.towerManagementSystem.tower.service;

import com.towerManagementSystem.tower.dto.LoginRequestDto;
import com.towerManagementSystem.tower.dto.Resposne.SuccessLoginResponse;
import com.towerManagementSystem.tower.dto.Resposne.UserResponseDto;
import com.towerManagementSystem.tower.dto.SignupRequestDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.UserRepository;
import com.towerManagementSystem.tower.utils.UploadImage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class AuthService {
    private final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    public SuccessResponse signup(SignupRequestDto signupRequestDto){
        if (!signupRequestDto.getConfirmPassword().equals(signupRequestDto.getPassword())){
            throw new CustomException("Confirm password doesn't match");
        }
        //check email or number already exist
        User userEmail=userRepository.findByEmail(signupRequestDto.getEmail()).orElse(null);
        User userPhone=userRepository.findByPhone(signupRequestDto.getPhone()).orElse(null);
        if(userEmail!=null && userPhone!=null){
            throw new CustomException("Email and phone number already registered.");
        }
        else if(userEmail!=null){
            throw new CustomException("Email already registered.");
        }
        else if(userPhone!=null){
            throw new CustomException("Phone number already registered.");
        }
        String currentFileName= UUID.randomUUID() +".png";
       User user=  User.builder()
               .phone(signupRequestDto.getPhone())
                .email(signupRequestDto.getEmail())
               .name(signupRequestDto.getName())
               .role(signupRequestDto.getRole())
                .image(currentFileName)
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .build();

        UploadImage.uploadImage(signupRequestDto.getImage(), currentFileName);
        userRepository.save(user);
        return SuccessResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("User signup successfully")
                .success(true)
                .timeStamp(LocalDateTime.now()).
                build();
    }
    public SuccessLoginResponse login(LoginRequestDto loginRequestDto){
        UserDetails userDetails= userDetailsService.loadUserByUsername(loginRequestDto.getEmail());
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(userDetails,loginRequestDto.getPassword(),null);
       Authentication authentication= authenticationManager.authenticate(authenticationToken);
       if(authentication.isAuthenticated()){
           SuccessLoginResponse successLoginResponse=new SuccessLoginResponse();
           successLoginResponse.setSuccess(true);
           successLoginResponse.setTimeStamp(LocalDateTime.now());
           successLoginResponse.setMessage("Login successfully");
           successLoginResponse.setStatus(HttpStatus.OK.value());
           User user=(User) authentication.getPrincipal();
           assert user != null;
           String imageName=user.getImage();
           UserResponseDto userResponseDto=UserResponseDto.builder()
                   .role(user.getRole())
                   .email(user.getEmail())
                   .id(user.getUserId())
                   .phone(user.getPhone())
                   .image(UploadImage.generateImageUrl(imageName))
                   .build();
           successLoginResponse.setToken(jwtService.generateToken(user));
           successLoginResponse.setUser(userResponseDto);
          return successLoginResponse;
       }
       throw new CustomException("Login failed");
    }
}
