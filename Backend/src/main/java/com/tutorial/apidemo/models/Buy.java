package com.tutorial.apidemo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity

public class Buy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    
	 private int id;
	 private int user;
	 private int book;
	 private String title;
	 private int quantity;
	 private int assess;
	 private String cmt;
	 private boolean sold_out;
	public Buy() {
		super();
	}
	public Buy(int id, int user, int book, String title, int quantity, int assess, String cmt, boolean sold_out) {
		super();
		this.id = id;
		this.user = user;
		this.book = book;
		this.title = title;
		this.quantity = quantity;
		this.assess = assess;
		this.cmt = cmt;
		this.sold_out = sold_out;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser() {
		return user;
	}
	public void setUser(int user) {
		this.user = user;
	}
	public int getBook() {
		return book;
	}
	public void setBook(int book) {
		this.book = book;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getAssess() {
		return assess;
	}
	public void setAssess(int assess) {
		this.assess = assess;
	}
	public String getCmt() {
		return cmt;
	}
	public void setCmt(String cmt) {
		this.cmt = cmt;
	}
	public boolean isSold_out() {
		return sold_out;
	}
	public void setSold_out(boolean sold_out) {
		this.sold_out = sold_out;
	}
	
	
}
