
package com.example.serversidesample.service;

import com.example.serversidesample.entities.Cerdentional;
import com.example.serversidesample.entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService extends ClientService {

    @Override
    public boolean login(Cerdentional credential) {
        return "admin".equals(credential.getUserName()) && "admin".equals(credential.getPassword());
    }

    public void addClient(Customer c) throws Exception {
        if (customerRepository.existsByname(c.getCerdentional().getUserName())) {
            throw new Exception("קייים לקוח עם שם זהה");
        }
        customerRepository.save(c);
    }

    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerByUserName(String userName) {
        return customerRepository.findByname(userName);
    }
}