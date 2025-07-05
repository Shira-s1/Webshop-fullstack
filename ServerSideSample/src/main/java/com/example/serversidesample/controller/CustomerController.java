package com.example.serversidesample.controller;

import com.example.serversidesample.entities.Customer;
import com.example.serversidesample.service.CouponService;
import com.example.serversidesample.service.CustumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173") // הוסף את הכתובת של הצד הקליינט

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustumerService custumerService;

    @GetMapping("/getAll")
    public List<Customer> getAllCustomer() {
        return custumerService.getAllCustomers();
    }

    @GetMapping("/getById/{id}")
    public Customer getCustomerById(@PathVariable int id) {
        return custumerService.getCustomerById(id);
    }




    @PostMapping("/post") //add
    public ResponseEntity<String> postCustomer(@RequestBody Customer customer) {
        try {
            custumerService.addCustomer(customer);
            return ResponseEntity.ok("Customer added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/put")
    public void putCustomer(@RequestBody Customer customer) {
        custumerService.updateCustomer(customer);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable int id) {
        try {
            custumerService.deleteCustomerById(id);
            return ResponseEntity.ok("Customer deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}



