package com.tutorial.apidemo.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tutorial.apidemo.models.Book;
import com.tutorial.apidemo.models.Buy;
import com.tutorial.apidemo.repositories.BookRepository;
import com.tutorial.apidemo.repositories.BuyRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BuyController {

	@Autowired
    private BuyRepository buyRepo;

	@Autowired
	private BookRepository bookRepo; 
 
	@GetMapping("/buyadmin")
	List<Buy> getAllBuy(){
		return buyRepo.findAll();
	}
	@GetMapping("/cart/{id}")
	public List<Buy> getBuyById(@PathVariable Integer id) {
	    return buyRepo.findByUser(id);
	}
	
	@PostMapping("/buy/insert")
    public String insertBuy(@RequestBody Buy buy) {
		 	Integer bookId = buy.getBook();
		 	Integer userId=buy.getUser();
	        String bookTitle = buy.getTitle();
	        Integer quantity=buy.getQuantity();
	        Buy newbuy = new Buy();
	        newbuy.setBook(bookId);
	        newbuy.setTitle(bookTitle);
	        newbuy.setUser(userId);
	        newbuy.setQuantity(quantity);
	        buyRepo.save(newbuy);
	        return "Mua sách thành công";
    }
    
	
	 @PutMapping("/buyadmin/{id}")
	 public String markBookAsSold(@PathVariable Integer id) {
	        Buy buy = buyRepo.findById(id).orElse(null);
	        if (buy != null) {
	            buy.setSold_out(true);
	            Integer bookId = buy.getBook();
	            Book book = bookRepo.findById(bookId).orElse(null);
	            if (book != null) {
	                int soldCount = book.getSold();
	                book.setSold(soldCount + 1);
	                bookRepo.save(book);
	            }
	            buyRepo.save(buy);
	            return "Cập nhật số lượng bán thành công";
	        }
	        
	        return "Không tìm thấy cuốn sách này";
	    }
	 
	 @PostMapping("/assess/{id}")
	 public String updateAssess(@PathVariable Integer id, @RequestBody Buy updatedBuy) {
	     Buy buy = buyRepo.findById(id).orElse(null);
	     if (buy != null) {
	         buy.setAssess(updatedBuy.getAssess());
	         buy.setCmt(updatedBuy.getCmt());
	         buyRepo.save(buy);
	         return "Đánh giá sách thành công";
	     }
	     
	     return "Không tìm thấy cuốn sách này";
	 }

	
	@DeleteMapping("/cart/delete/{id}")
	public String deleteBuy(@PathVariable Integer id) {
        boolean exists = buyRepo.existsById(id);
        if(exists) {
            buyRepo.deleteById(id);
            return "Delete Buy successfully";
            
        }
        return "Cannot find Buy to delete";
    }
	
	
}
