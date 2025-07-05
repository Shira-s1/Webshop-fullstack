
package com.example.serversidesample.service;

import com.example.serversidesample.entities.Cerdentional;
import com.example.serversidesample.entities.Customer;
import com.example.serversidesample.reposetories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ClientService {
    @Autowired
    protected CustomerRepository customerRepository;

    public abstract boolean login(Cerdentional credential);

    public void updateClient(Customer customer) {
        customerRepository.save(customer);
    }
}