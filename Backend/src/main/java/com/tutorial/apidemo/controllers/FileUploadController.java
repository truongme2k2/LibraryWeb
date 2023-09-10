package com.tutorial.apidemo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.tutorial.apidemo.models.Book;
import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.repositories.BookRepository;
import com.tutorial.apidemo.repositories.UserRepository;
import com.tutorial.apidemo.services.IStorageService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {
	@Autowired
    private IStorageService storageService;
	
	@Autowired
    private BookRepository repository;
	
	@Autowired
    private UserRepository userRepo;
	
	@PostMapping("/FileUpload/{id}")
	public String uploadFile(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
	    try {
	        String generatedFileName = storageService.storeFile(file);

	        Book book = repository.findById(id).orElse(null);
	        if (book != null) {
	            book.setBook_cover(generatedFileName);
	            repository.save(book);
	        }

	        return "Upload file successfully: " + generatedFileName;
	    } catch (Exception exception) {
	        return "Error uploading file: " + exception.getMessage();
	    }
	}
    
	@PostMapping("/avatar/{id}")
	public String uploadAvatar(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
	    try {
	        String generatedFileName = storageService.storeFile(file);

	        User user = userRepo.findById(id).orElse(null);
	        if (user != null) {
	            user.setAvatar(generatedFileName);
	            userRepo.save(user);
	        }

	        return "Upload file successfully: " + generatedFileName;
	    } catch (Exception exception) {
	        return "Error uploading file: " + exception.getMessage();
	    }
	}
	
	
    @GetMapping("/FileUpload/files/{fileName:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] bytes = storageService.readFileContent(fileName);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        }catch (Exception exception) {
            return ResponseEntity.noContent().build();
        }
    }

}
