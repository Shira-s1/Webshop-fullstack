package com.example.serversidesample.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Objects;


@Entity
public class Coupon {

    public enum  Category {FOOD,ELECTRONIC,OTHER}
    @Id
    private int id;
    private String name;
    private String description;
    private float discount;
    private int amount;
    @Enumerated(EnumType.STRING)
    private Category category;
    private LocalDateTime expiryDate;

    public Coupon() {
    }

    public Coupon(int id,String name, String description, float discount, int amount, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.discount = discount;
        this.amount = amount;
        this.category = category;
    }

    public int getId() {
        return id;
    }
    public int setId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", discount=" + discount +
                ", amount=" + amount +
                ", category=" + category +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return id == coupon.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
