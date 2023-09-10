package com.tutorial.apidemo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.tutorial.apidemo.models.Book;
import com.tutorial.apidemo.repositories.BookRepository;

import java.util.List;
import java.util.Optional;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    
	 @Autowired
	    private BookRepository repository;
	 
    @GetMapping({"/books","/user"})
    List<Book> getAllBooks(){
    	return repository.findAll();
    }

    @GetMapping({"/book/{id}","/buy/{id}"})
    Book getBookById(@PathVariable Integer id) {
        Optional<Book> book = repository.findById(id);
        return book.orElse(null); 
    }


    @PutMapping("/book/{id}")
    public ResponseEntity<String> updateBook(@RequestBody Book newBook, @PathVariable Integer id) {
    	Book updatedBook = repository.findById(id)
	    .map(book -> {
		    book.setTitle(newBook.getTitle());
		    book.setAuthor(newBook.getAuthor());
		    book.setCategory(newBook.getCategory());
		    book.setDate(newBook.getDate());
		    book.setPage(newBook.getPage());
		    book.setDescription(newBook.getDescription());
		    book.setBook_cover(newBook.getBook_cover());
		    return repository.save(book);
	    })
	    .orElseGet(() -> {
		    newBook.setId(id);
		    return repository.save(newBook);
	    });
    	return ResponseEntity.ok("Sua sach thanh cong");
    }
    
    @PostMapping("/book/insert")
    public ResponseEntity<String> insertBook(@RequestBody Book newBook) {
        List<Book> foundBook = repository.findByTitle(newBook.getTitle().trim());
        if (foundBook.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Ten sach da bi trung");
        }
        Book savedBook = repository.save(newBook);
        Integer bookId = savedBook.getId();
        return ResponseEntity.status(HttpStatus.OK).body(bookId.toString());
    }


    @DeleteMapping("/book/{id}")
    public String deleteBook(@PathVariable Integer id) {
        boolean exists = repository.existsById(id);
        if(exists) {
            repository.deleteById(id);
            return "Xoa sach thanh cong";
        }
        return "Khong tim duoc sach de xoa";
    }
    
    
}
