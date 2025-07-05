package com.example.serversidesample.reposetories;

import com.example.serversidesample.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Override
    List<Customer> findAll();
    Customer findById(int id);
    //boolean existsByAgeAfter(int age);
    boolean existsByname(String name);
    Customer findByname(String name);
}
