
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
// } from "@mui/material";

// function CouponList() {
//   const [coupons, setCoupons] = useState([]);
//   const [newCoupon, setNewCoupon] = useState({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
//   const [searchCategory, setSearchCategory] = useState("");
//   const [searchId, setSearchId] = useState("");

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   const fetchCoupons = () => {
//     const token = localStorage.getItem("token"); // קבלת הטוקן
//     axios
//       .get("http://localhost:8080/coupon/getAll", {
//         headers: { Authorization: `Bearer ${token}` } // העברת הטוקן
//       })
//       .then((response) => setCoupons(response.data))
//       .catch((error) => console.error("Error fetching coupons:", error));
//   };

//   const addCoupon = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .post("http://localhost:8080/coupon/post", newCoupon, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(() => {
//         alert("Coupon added successfully!");
//         setNewCoupon({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
//         fetchCoupons();
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 500) {
//           alert("Cannot add coupon: " + error.response.data);
//         } else {
//           console.error("Error adding coupon:", error);
//           alert("Error adding coupon. Please try again.");
//         }
//       });
//   };

//   const updateCoupon = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .put(`http://localhost:8080/coupon/put`, newCoupon, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(() => {
//         alert("Coupon updated successfully!");
//         setNewCoupon({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
//         fetchCoupons();
//       })
//       .catch((error) => console.error("Error updating coupon:", error));
//   };

//   const deleteCoupon = () => {
//     if (!searchId) {
//       alert("Please enter a coupon ID to delete.");
//       return;
//     }
//     const token = localStorage.getItem("token");
//     axios
//       .delete(`http://localhost:8080/coupon/delete/${searchId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(() => {
//         alert("Coupon deleted successfully!");
//         setSearchId("");
//         fetchCoupons();
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 404) {
//           alert(" " + error.response.data);
//         } else {
//           console.error("Error deleting coupon:", error);
//           alert("Error deleting coupon. Please try again.");
//         }
//       });
//   };

//   const searchCouponsByCategory = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`http://localhost:8080/coupon/coupons/category/${searchCategory}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then((response) => {
//         if (response.data && response.data.length > 0) {
//           setCoupons(response.data);
//         } else {
//           alert("No coupons found for this category.");
//           fetchCoupons(); // Optional: fetch all coupons to reset the list
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching coupons by category:", error);
//         alert("Error fetching coupons by category. Please try again.");
//       });
//   };

//   return (
//     <>
//       <AppBar position="static" style={{ backgroundColor: "#6200ea" }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Coupon Management
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container style={{ marginTop: "20px" }}>
//         <Card style={{ padding: "20px", marginBottom: "20px" }}>
//           <CardContent>
//             <Typography variant="h5">Add a New Coupon:</Typography>
//             <TextField
//               label="ID"
//               variant="outlined"
//               value={newCoupon.id}
//               onChange={(e) => setNewCoupon({ ...newCoupon, id: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Name"
//               variant="outlined"
//               value={newCoupon.name}
//               onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Description"
//               variant="outlined"
//               value={newCoupon.description}
//               onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Discount"
//               variant="outlined"
//               value={newCoupon.discount}
//               onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Amount"
//               variant="outlined"
//               value={newCoupon.amount}
//               onChange={(e) => setNewCoupon({ ...newCoupon, amount: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Category"
//               variant="outlined"
//               value={newCoupon.category}
//               onChange={(e) => setNewCoupon({ ...newCoupon, category: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <TextField
//               label="Expiry Date"
//               type="datetime-local"
//               variant="outlined"
//               value={newCoupon.expiryDate}
//               onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
//               style={{ marginBottom: "10px", marginRight: "10px" }}
//             />
//             <Button variant="contained" color="success" onClick={addCoupon}>
//               Add Coupon
//             </Button>
//             <Button variant="contained" color="primary" onClick={updateCoupon} style={{ marginLeft: "10px" }}>
//               Update Coupon
//             </Button>
//             <TextField
//               label="Search Category"
//               variant="outlined"
//               value={searchCategory}
//               onChange={(e) => setSearchCategory(e.target.value)}
//               style={{ marginLeft: "10px", marginBottom: "10px" }}
//             />
//             <Button variant="contained" color="info" onClick={searchCouponsByCategory} style={{ marginLeft: "10px" }}>
//               Search by Category
//             </Button>
//             <TextField
//               label="Delete by ID"
//               variant="outlined"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               style={{ marginLeft: "10px", marginBottom: "10px" }}
//             />
//             <Button variant="contained" color="error" onClick={deleteCoupon} style={{ marginLeft: "10px" }}>
//               Delete Coupon
//             </Button>
//           </CardContent>
//         </Card>

//         <Typography variant="h5" style={{ marginBottom: "10px" }}>
//           All Coupons:
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Discount</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Expiry Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {coupons.map((coupon) => (
//                 <TableRow key={coupon.id}>
//                   <TableCell>{coupon.id}</TableCell>
//                   <TableCell>{coupon.name}</TableCell>
//                   <TableCell>{coupon.description}</TableCell>
//                   <TableCell>{coupon.discount}</TableCell>
//                   <TableCell>{coupon.amount}</TableCell>
//                   <TableCell>{coupon.category}</TableCell>
//                   <TableCell>{new Date(coupon.expiryDate).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </>
//   );
// }

// export default CouponList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box
} from "@mui/material";

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
  const [searchCategory, setSearchCategory] = useState("");
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/coupon/getAll", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setCoupons(response.data))
      .catch((error) => console.error("Error fetching coupons:", error));
  };

  const addCoupon = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/coupon/post", newCoupon, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Coupon added successfully!");
        setNewCoupon({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
        fetchCoupons();
      })
      .catch((error) => {
        if (error.response) {
          alert("Cannot add coupon: " + error.response.data);
        } else {
          console.error("Error adding coupon:", error);
          alert("Error adding coupon. Please try again.");
        }
      });
  };

  const updateCoupon = () => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:8080/coupon/put`, newCoupon, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Coupon updated successfully!");
        setNewCoupon({ id: "", name: "", description: "", discount: "", amount: "", category: "", expiryDate: "" });
        fetchCoupons();
      })
      .catch((error) => console.error("Error updating coupon:", error));
  };

  const deleteCoupon = () => {
    if (!searchId) {
      alert("Please enter a coupon ID to delete.");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/coupon/delete/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Coupon deleted successfully!");
        setSearchId("");
        fetchCoupons();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("Error deleting coupon:", error);
          alert("Error deleting coupon. Please try again.");
        }
      });
  };

  const searchCouponsByCategory = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/coupon/coupons/category/${searchCategory}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCoupons(response.data);
        } else {
          alert("No coupons found for this category.");
          fetchCoupons();
        }
      })
      .catch((error) => {
        console.error("Error fetching coupons by category:", error);
        alert("Error fetching coupons by category. Please try again.");
      });
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#2fb2ca" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Coupon Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#838889' }}>Add a New Coupon:</Typography>
            <TextField
              label="ID"
              variant="outlined"
              value={newCoupon.id}
              onChange={(e) => setNewCoupon({ ...newCoupon, id: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={newCoupon.name}
              onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Description"
              variant="outlined"
              value={newCoupon.description}
              onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Discount"
              variant="outlined"
              value={newCoupon.discount}
              onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Amount"
              variant="outlined"
              value={newCoupon.amount}
              onChange={(e) => setNewCoupon({ ...newCoupon, amount: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Category"
              variant="outlined"
              value={newCoupon.category}
              onChange={(e) => setNewCoupon({ ...newCoupon, category: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Expiry Date"
              type="datetime-local"
              variant="outlined"
              value={newCoupon.expiryDate}
              onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" color="success" onClick={addCoupon} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Add Coupon
              </Button>
              <Button variant="contained" color="primary" onClick={updateCoupon} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Update Coupon
              </Button>
            </div>
          </CardContent>
        </Card>

        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Search Category"
            variant="outlined"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{ marginBottom: "10px", width: '200px' }}
            size="small"
          />
          <Button variant="contained" color="info" onClick={searchCouponsByCategory} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
            Search by Category
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Delete by ID"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ marginBottom: "10px", width: '200px' }}
            size="small"
          />
          <Button variant="contained" color="error" onClick={deleteCoupon} style={{ marginLeft: "10px", backgroundColor: '#05b2d2' }}>
            Delete Coupon
          </Button>
        </div>

        {/* <Typography variant="h5" style={{ marginTop: "20px", marginBottom: "10px" }}>
          All Coupons:
        </Typography> */}
         <Box style={{ marginTop: "20px", marginBottom: "20px", borderBottom: "2px solid #838889", paddingBottom: "5px" }}>
          <Typography variant="h5" style={{  color: '#838889' }}>
            All Coupons:
          </Typography>
          </Box>
        <TableContainer component={Paper} style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Discount</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Expiry Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell>{coupon.name}</TableCell>
                  <TableCell>{coupon.description}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.amount}</TableCell>
                  <TableCell>{coupon.category}</TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CouponList;