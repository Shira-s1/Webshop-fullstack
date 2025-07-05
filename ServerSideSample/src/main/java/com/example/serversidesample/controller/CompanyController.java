package com.example.serversidesample.controller;

import com.example.serversidesample.entities.Company;
import com.example.serversidesample.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173") // הוסף את הכתובת של הצד הקליינט

@RestController
@RequestMapping("/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping("/getAll")
    public List<Company> getAll(){
        return companyService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Company getById(@PathVariable int id){
        return companyService.getById(id);
    }
    @GetMapping("/getByName/{name}")
    public Company getByName(@PathVariable String name){
        return companyService.getByName(name);
    }
//    @PostMapping("/post")
//    public ResponseEntity<String> post(@RequestBody Company company){
//        try{
//            companyService.addCompany(company);
//            return ResponseEntity.ok("Company added successfully.");
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//
//        }
//    }
@PostMapping("/post")
public ResponseEntity<String> post(@RequestBody Company company) {
    if ((companyService.getById(company.getId()))!=null) {
        // אם החברה קיימת, לא ניתן להוסיף
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot add coupon: Company with this ID already exists.");
    }
    try {
        companyService.addCompany(company);
        return ResponseEntity.ok("Company added successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}

    @PutMapping("/put")
    public void put(@RequestBody Company company){
        companyService.updateCompany(company);
    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> delete(@PathVariable int id){
//        try {
//            companyService.deleteCompany(id);
//            return ResponseEntity.ok("Customer deleted successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        }
//
//    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        if ((companyService.getById(id))==null) {
            // אם החברה לא קיימת, לא ניתן למחוק
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot delete: Company not found.");
        }
        try {
            companyService.deleteCompany(id);
            return ResponseEntity.ok("Company deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}