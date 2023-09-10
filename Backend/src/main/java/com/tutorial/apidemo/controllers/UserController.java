package com.tutorial.apidemo.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.repositories.UserRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	 @Autowired
	    private UserRepository repo;
	
	 @PostMapping("/signup")
	 public ResponseEntity<String> signup(@RequestBody User newUser, HttpSession session) {
	     List<User> foundUser = repo.findByEmail(newUser.getEmail().trim());
	     if (!foundUser.isEmpty()) {
	         return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Email đã được sử dụng");
	     }
	     
	     newUser.setRole("User");
	     repo.save(newUser);
	     
	     List<User> createdUser = repo.findByEmail(newUser.getEmail().trim());
	     if (createdUser.isEmpty()) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi tạo người dùng");
	     }
	     
	     User user = createdUser.get(0);
	     session.setAttribute("userId", user.getId());
	     
	     return ResponseEntity.ok("Signup thành công");
	 }

	 
	 @PostMapping("/login")
	 public ResponseEntity<Map<String, String>> login(@RequestBody User user, HttpSession session) {
	     List<User> foundUser = repo.findByEmail(user.getEmail().trim());
	     if (foundUser.isEmpty()) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "err"));
	     }
	     User existingUser = foundUser.get(0);
	     if (!existingUser.getPassword().equals(user.getPassword())) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Sai mật khẩu"));
	     }
	     
	     Integer userId = existingUser.getId();
	     String userRole = existingUser.getRole(); 
	     
	     Map<String, String> response = new HashMap<>();
	     response.put("userId", userId.toString());
	     response.put("role", userRole);
	     
	     return ResponseEntity.ok(response);
	 }

	 @GetMapping("/setting/{id}")
    User getUserById(@PathVariable Integer id) {
        Optional<User> user  = repo.findById(id);
        return user.orElse(null); 
    }
}



