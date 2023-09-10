package com.tutorial.apidemo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByEmail(String email);
}