package com.example.serversidesample.service;

import com.example.serversidesample.entities.Company;
import com.example.serversidesample.reposetories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAll(){
        return companyRepository.findAll();
    }
    public Company getByName(String name){
        return companyRepository.findByName(name);
    }
    public Company getById(int id){
       return companyRepository.findById(id);
    }

    public void updateCompany(Company company){
        companyRepository.save(company);
    }
    public void deleteCompany(int id)throws Exception{
        companyRepository.deleteById(id);
    }
    public void addCompany(Company company)throws Exception{
        companyRepository.save(company);
    }
//   public Company mostPopularCompany(){
//        int maxLen=0;
//       Company maxCompany=null;
//        for (Company company : companyRepository) {
//            if(company.get_coupons().size() > maxLen){
//                maxLen = company.get_coupons().size();
//                maxCompany = company;
//            }
//        }
//        return maxCompany;
//   }
//    public List <Coupon> getAllCouponsByCompany(Long id){
//        Company company = companyRepository.getById(id);
//        List<Coupon> coupons = company.get_coupons();
//        return coupons;
//    }
}
