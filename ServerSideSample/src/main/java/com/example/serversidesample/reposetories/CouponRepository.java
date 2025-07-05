package com.example.serversidesample.reposetories;

import com.example.serversidesample.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

//כל הפונקציות שמאפשרות גישה למסד נתונים- repositories
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {

    boolean existsByName(String name);
    List<Coupon> findByNameContaining(String name);
    List<Coupon> findAll();

    @Modifying
    @Query("delete from Coupon c where c.expiryDate = :date")
    void deleteCouponByExpiryDate(@Param("date" )LocalDate date);
    List<Coupon> findByCategory(Coupon.Category category);

}
