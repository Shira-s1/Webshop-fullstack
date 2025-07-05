
package com.example.serversidesample.service;

import com.example.serversidesample.entities.Cerdentional;
import com.example.serversidesample.entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustumerService extends ClientService {

    @Override
    public boolean login(Cerdentional credential) {
        String password = getPasswordByUserName(credential.getUserName());
        return password != null && password.equals(credential.getPassword());
    }

    public void addCustomer(Customer customer) throws Exception {
        if (customerRepository.existsById(customer.getId())) {
            throw new Exception("Exsist ID ");
        }
        customerRepository.save(customer);
    }

    public Customer getCustomerById(int id) {
        return customerRepository.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomerById(int id) throws Exception {
        if (!customerRepository.existsById(id)) {
            throw new Exception("Cannot delete customer: customer does not exist.");
        }
        customerRepository.deleteById(id);
    }

    public void updateCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    public String getPasswordByUserName(String username) {
        for (Customer customer : customerRepository.findAll()) {
            if (customer.getCerdentional().getUserName().equals(username)) {
                return customer.getCerdentional().getPassword();
            }
        }
        return null;
    }
}
