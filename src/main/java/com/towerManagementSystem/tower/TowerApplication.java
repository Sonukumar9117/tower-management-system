package com.towerManagementSystem.tower;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TowerApplication implements CommandLineRunner {

	public static void main(String[] args) {

	 	SpringApplication.run(TowerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Your backend is running fine");
	}
}
