    package com.example.serversidesample.controller;

    import com.example.serversidesample.entities.*;
    import com.example.serversidesample.service.CouponService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @CrossOrigin(origins = "http://localhost:5173") // הוסף את הכתובת של הצד הקליינט

    @RestController
    @RequestMapping("/coupon")
    public class CouponController {
        @Autowired//מאתחל את האובייקאט לבד אחריות יציאת המופעים מואלתעל סביבית ה- spring
        private CouponService couponService;

        @GetMapping("/getAll")
        public List<Coupon> getAllCoupons() {
            return couponService.getAllCoupons();
        }

        @PostMapping("/post")
        public ResponseEntity<String> addCoupon(@RequestBody Coupon coupon) throws Exception {
            try{
                couponService.addCoupon(coupon);
                return ResponseEntity.ok("Coupon added successfully.");
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

            }
//            couponService.addCoupon(coupon);
        }


        @PutMapping("/put")
        public void updateCoupon(@RequestBody Coupon coupon) {
          couponService.updateCoupon(coupon);

        }
//        @DeleteMapping("/delete/{id}")
//        public void deleteCoupon(@PathVariable int id) {
//            couponService.deleteCouponById(id);
//        }
@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteCoupon(@PathVariable int id)  {
    try {
        couponService.deleteCouponById(id);
        return ResponseEntity.ok("Coupon deleted successfully!");
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if not found
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}


        @GetMapping("/coupons/category/{category}")
        public ResponseEntity<List<Coupon>> getCouponsByCategory(@PathVariable Coupon.Category category) {
            List<Coupon> coupons = couponService.getCouponsByCategory(category);
            if (coupons.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(coupons);
        }

    }
