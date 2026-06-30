package com.towerManagementSystem.tower.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.towerManagementSystem.tower.domain.UserRole;
import com.towerManagementSystem.tower.dto.LoginRequestDto;
import com.towerManagementSystem.tower.dto.Resposne.SuccessLoginResponse;
import com.towerManagementSystem.tower.dto.Resposne.TechnicianResponse;
import com.towerManagementSystem.tower.dto.Resposne.TenantResponse;
import com.towerManagementSystem.tower.dto.SuccessTechnicianCreatedResponse;
import com.towerManagementSystem.tower.dto.SuccessTenantCreatedResponse;
import com.towerManagementSystem.tower.dto.request.RegisterTechnicianDto;
import com.towerManagementSystem.tower.dto.request.RegisterTenantDto;
import com.towerManagementSystem.tower.dto.request.SignupRequestDto;
import com.towerManagementSystem.tower.dto.SuccessResponse;
import com.towerManagementSystem.tower.exception.CustomException;
import com.towerManagementSystem.tower.mapper.UserMapper;
import com.towerManagementSystem.tower.modal.Admin;
import com.towerManagementSystem.tower.modal.Technician;
import com.towerManagementSystem.tower.modal.Tenant;
import com.towerManagementSystem.tower.modal.User;
import com.towerManagementSystem.tower.respository.UserRepository;
import com.towerManagementSystem.tower.utils.UploadImage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class AuthService {
    private final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final Cloudinary cloudinary;
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
       User user= User.builder()
               .phone(signupRequestDto.getPhone())
                .email(signupRequestDto.getEmail())
               .name(signupRequestDto.getName())
               .unreadNotificationCount(0L)
               .role(signupRequestDto.getRole())
//                .image(currentFileName)
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .build();
           Admin admin=new Admin();
           admin.setUser(user);
           user.setAdmin(admin);
           user.setImage(UploadImage.uploadImageOnCloudinary(cloudinary,signupRequestDto.getImage()));
        userRepository.save(user);


        return SuccessResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("User signup successfully")
                .success(true)
                .timeStamp(LocalDateTime.now()).
                build();
    }

    public SuccessResponse registerTechnician(RegisterTechnicianDto registerTechnicianDto){
        User userEmail=userRepository.findByEmail(registerTechnicianDto.getEmail()).orElse(null);
        User userPhone=userRepository.findByPhone(registerTechnicianDto.getPhone()).orElse(null);
        if(userEmail!=null && userPhone!=null){
            throw new CustomException("Email and phone number already registered.");
        }
        else if(userEmail!=null){
            throw new CustomException("Email already registered.");
        }
        else if(userPhone!=null) {
            throw new CustomException("Phone number already registered.");
        }
            Technician technician=new Technician();
           technician.setExperience(registerTechnicianDto.getExperience());
           technician.setSkill(registerTechnicianDto.getSkill());
        User user=User.builder()
                .unreadNotificationCount(0L)
                .name(registerTechnicianDto.getName())
                .phone(registerTechnicianDto.getPhone())
                .email(registerTechnicianDto.getEmail())
                .image(UploadImage.uploadImageOnCloudinary(cloudinary, registerTechnicianDto.getImage()))
                .password(passwordEncoder.encode(registerTechnicianDto.getPassword()))
                .role(UserRole.TECHNICIAN)
                        .build();
            technician.setUser(user);
           user.setTechnician(technician);
           User savedUser= userRepository.save(user);
        TechnicianResponse technicianResponse=new TechnicianResponse();
        technicianResponse.setName(savedUser.getName());
        technicianResponse.setImage(user.getImage());
        technicianResponse.setEmail(savedUser.getEmail());
        technicianResponse.setPhone(user.getPhone());
        technicianResponse.setId(user.getUserId());
        technicianResponse.setRole(user.getRole());
        technicianResponse.setSkill(savedUser.getTechnician().getSkill());
        SuccessTechnicianCreatedResponse response=new SuccessTechnicianCreatedResponse();
        response.setUser(technicianResponse);
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Tenant added successfully");
        response.setSuccess(true);
        response.setTimeStamp(LocalDateTime.now());
        return response;
    }
    public SuccessTenantCreatedResponse registerTenant(RegisterTenantDto registerTenantDto){
        User userEmail=userRepository.findByEmail(registerTenantDto.getEmail()).orElse(null);
        User userPhone=userRepository.findByPhone(registerTenantDto.getPhone()).orElse(null);
        if(userEmail!=null && userPhone!=null){
            throw new CustomException("Email and phone number already registered.");
        }
        else if(userEmail!=null){
            throw new CustomException("Email already registered.");
        }
        else if(userPhone!=null) {
            throw new CustomException("Phone number already registered.");
        }
        Tenant tenant=new Tenant();
        tenant.setBuilding(registerTenantDto.getBuilding());
        tenant.setFloor(registerTenantDto.getFloor());
        tenant.setCompanyName(registerTenantDto.getCompanyName());


        User user=User.builder()
                .unreadNotificationCount(0L)
                .name(registerTenantDto.getName())
                .phone(registerTenantDto.getPhone())
                .email(registerTenantDto.getEmail())
                .password(passwordEncoder.encode(registerTenantDto.getPassword()))
                .role(UserRole.TENANT)
                .build();
        user.setImage(UploadImage.uploadImageOnCloudinary(cloudinary,registerTenantDto.getImage()));
        tenant.setUser(user);
        user.setTenant(tenant);
        User savedUser=userRepository.save(user);
        TenantResponse tenantResponse = getTenantResponse(savedUser, user);
        SuccessTenantCreatedResponse response=new SuccessTenantCreatedResponse();
        response.setUser(tenantResponse);
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Tenant added successfully");
        response.setSuccess(true);
        response.setTimeStamp(LocalDateTime.now());
        return response;
    }

    private static TenantResponse getTenantResponse(User savedUser, User user) {
        TenantResponse tenantResponse=new TenantResponse();
        tenantResponse.setName(savedUser.getName());
        tenantResponse.setImage(user.getImage());
        tenantResponse.setEmail(savedUser.getEmail());
        tenantResponse.setPhone(user.getPhone());
        tenantResponse.setId(user.getUserId());
        tenantResponse.setFloor(user.getTenant().getFloor());
        tenantResponse.setCompanyName(user.getTenant().getCompanyName());
        tenantResponse.setBuilding(user.getTenant().getBuilding());
        tenantResponse.setRole(user.getRole());
        return tenantResponse;
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
           List<String> fcmToken=user.getFcmTokens();
           System.out.println(fcmToken);
           fcmToken.add(loginRequestDto.getFcmToken());
           user.setFcmTokens(fcmToken);
           successLoginResponse.setToken(jwtService.generateToken(user));
           successLoginResponse.setUser(UserMapper.toUserResponseDto(user));
          return successLoginResponse;
       }
       throw new CustomException("Login failed");
    }

    public SuccessResponse logout(String fcmToken){
      User user=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        assert user != null;
        List<String>fcmTokens=user.getFcmTokens();
        if(fcmTokens!=null){
            fcmTokens.remove(fcmToken);
            user.setFcmTokens(fcmTokens);
        }
        else {
            user.setFcmTokens(new ArrayList<>());
        }
        return SuccessResponse.builder()
                .success(true)
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .message("Logout successfully")
                .build();
    }
}
