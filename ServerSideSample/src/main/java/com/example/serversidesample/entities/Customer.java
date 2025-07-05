package com.example.serversidesample.entities;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;
@Entity
public class Customer {
    @Id
    private int id;
    private String name;
    private String email;
    @Embedded private Cerdentional cerdentional;


    @OneToMany
    private List<Coupon> _coupons;

    public Customer() {
    }

    public Customer(int id, String name, String email, Cerdentional cerdentional, List<Coupon> _coupons) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cerdentional = cerdentional;
        this._coupons = _coupons;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Cerdentional getCerdentional() {
        return cerdentional;
    }

    public void setCerdentional(Cerdentional cerdentional) {
        this.cerdentional = cerdentional;
    }

    public List<Coupon> get_coupons() {
        return _coupons;
    }

    public void set_coupons(List<Coupon> _coupons) {
        this._coupons = _coupons;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", cerdentional=" + cerdentional +
                ", _coupons=" + _coupons +
                '}';
    }
}
