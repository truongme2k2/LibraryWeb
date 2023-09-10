package com.tutorial.apidemo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.Book;
import com.tutorial.apidemo.models.Buy;


public interface BuyRepository extends JpaRepository<Buy, Integer> {
	List<Buy> findByUser(int user);
}
