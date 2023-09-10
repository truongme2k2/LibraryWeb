package com.tutorial.apidemo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
	 List<Book> findByTitle(String title);
}
