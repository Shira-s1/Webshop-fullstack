package com.example.serversidesample.service;

import com.example.serversidesample.entities.Coupon;
import com.example.serversidesample.entities.Customer;
import com.example.serversidesample.reposetories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

// משתמשת ב- REPOSITORIES ,רושמת את הקוד עצמו של הפרוייקט
@Service
public class CouponService {
    @Autowired// מבקשים מהסביבה שתזריק את תוכל האובייקט שהיא אחראית לנהל
    private CouponRepository couponRepository;

    public void addCoupon(Coupon coupon) throws Exception{
        if(couponRepository.existsById(coupon.getId()))
           // couponRepository.findAll();
            throw new Exception("exists id");
        couponRepository.save(coupon);// הוספה או עדכון במסד הנתונים
    }



    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }
    public Coupon getCouponById(int id) {
        return couponRepository.findById(id).orElse(null);
    }
    public void updateCoupon(Coupon coupon) {
        couponRepository.save(coupon);
    }
//    public void deleteCouponById(int id) {
//        couponRepository.deleteById(id);
//    }
public void deleteCouponById(int id) throws Exception {
    if (!couponRepository.existsById(id)) {
        System.out.println("no coupon found");
        throw new RuntimeException("Coupon not found."); // Throw exception if coupon does not exist
    }
    couponRepository.deleteById(id);
}

    public List<Coupon>getCouponsByCategory(Coupon.Category category) {
        return couponRepository.findByCategory(category);
    }


}
