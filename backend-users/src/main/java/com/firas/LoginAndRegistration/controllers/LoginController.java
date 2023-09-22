package com.firas.LoginAndRegistration.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firas.LoginAndRegistration.models.LoginUser;
import com.firas.LoginAndRegistration.models.User;
import com.firas.LoginAndRegistration.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User newUser, BindingResult result, HttpSession session) {
        userService.register(newUser, result);

        
//            return ResponseEntity.badRequest().body("Registration failed: Validation errors or other issues.");
            if (result.hasErrors()) {
    			List<String> errors = result.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
    					.collect(Collectors.toList());
    			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        session.setAttribute("user_id", newUser.getId());
        System.out.println(session.getAttribute("user_id"));
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUser newLogin, BindingResult result, HttpSession session) {
        User user = userService.login(newLogin, result);

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Login failed: Invalid credentials or other issues.");
        }

        session.setAttribute("user_id", user.getId()); 
        System.out.println(session.getAttribute("user_id"));
        return ResponseEntity.ok(user);
    }



    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmailExists(@PathVariable String email) {
        boolean emailExists = userService.emailExists(email);
        return ResponseEntity.ok(emailExists);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully.");
    }
    
   
        @GetMapping("/users/{userId}")
        public ResponseEntity<?> getUserById(@PathVariable Long userId) {
            User user = userService.findOne(userId);

            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    
        @GetMapping("/allUsers")
        public ResponseEntity<?> getAllUsers() {
            List<User> users = userService.allUsers();
            if (!users.isEmpty()) {
                return ResponseEntity.ok(users);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

}
