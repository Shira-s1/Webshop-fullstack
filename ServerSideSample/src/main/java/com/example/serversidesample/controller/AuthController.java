package com.example.serversidesample.controller;

import com.example.serversidesample.entities.Cerdentional;
import com.example.serversidesample.jwt.JwtUtil;
import com.example.serversidesample.service.AdminService;
import com.example.serversidesample.service.ClientService;
import com.example.serversidesample.service.CustumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // הוסף את הכתובת של הצד הקליינט
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AdminService adminService;
    @Autowired private CustumerService customerService;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Cerdentional cred) {
        System.out.println("Login request: " + cred.getUserName());

        String username = cred.getUserName();
        String password = cred.getPassword();

        if (adminService.login(cred)) {
            String token = jwtUtil.generateToken(username, "ROLE_ADMIN");
            return ResponseEntity.ok(token);
        } else if (customerService.login(cred)) {
            String token = jwtUtil.generateToken(username, "ROLE_PERSON");
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
        }
    }
}
