package com.example.serversidesample.reposetories;

import com.example.serversidesample.entities.Company;
import com.example.serversidesample.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

     Company findByName(String name);
     Company findById(int id);
     //Company mostPopularCompany(List<Company> companies);//check if it working
     //  List <Coupon> getAllCouponsByCompany(Long id);
     // Company mostCompany(List<Company> companies);

}
