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

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ id: "", name: "", email: "", cerdentional: { userName: "", password: "" } });
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/customers/getAll", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const addCustomer = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/customers/post", newCustomer, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Customer added successfully!");
        setNewCustomer({ id: "", name: "", email: "", cerdentional: { userName: "", password: "" } });
        fetchCustomers();
      })
      .catch((error) => {
        if (error.response) {
          alert("Cannot add customer: " + error.response.data);
        } else {
          console.error("Error adding customer:", error);
          alert("Error adding customer. Please try again.");
        }
      });
  };

  const updateCustomer = () => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:8080/customers/put`, newCustomer, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Customer updated successfully!");
        setNewCustomer({ id: "", name: "", email: "", cerdentional: { userName: "", password: "" } });
        fetchCustomers();
      })
      .catch((error) => console.error("Error updating customer:", error));
  };

  const deleteCustomer = () => {
    if (!searchId) {
      alert("Please enter a customer ID to delete.");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/customers/delete/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Customer deleted successfully!");
        setSearchId("");
        fetchCustomers();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("Error deleting customer:", error);
          alert("Error deleting customer. Please try again.");
        }
      });
  };

  const searchCustomer = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/customers/getById/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data) {
          setNewCustomer(response.data);
        } else {
          alert("Customer not found");
        }
      })
      .catch((error) => console.error("Error fetching customer:", error));
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#2fb2ca" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#838889' }}>Add a New Customer:</Typography>
            <TextField
              label="ID"
              variant="outlined"
              value={newCustomer.id}
              onChange={(e) => setNewCustomer({ ...newCustomer, id: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Email"
              variant="outlined"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Username"
              variant="outlined"
              value={newCustomer.cerdentional.userName}
              onChange={(e) => setNewCustomer({ ...newCustomer, cerdentional: { ...newCustomer.cerdentional, userName: e.target.value } })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={newCustomer.cerdentional.password}
              onChange={(e) => setNewCustomer({ ...newCustomer, cerdentional: { ...newCustomer.cerdentional, password: e.target.value } })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" color="success" onClick={addCustomer} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Add Customer
              </Button>
              <Button variant="contained" color="primary" onClick={updateCustomer} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Update Customer
              </Button>
            </div>
          </CardContent>
        </Card>

        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Search by ID"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ marginBottom: "10px", width: '200px' }}
            size="small"
          />
          <Button variant="contained" color="info" onClick={searchCustomer} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
            Search
          </Button>
          <Button variant="contained" color="error" onClick={deleteCustomer} style={{ marginLeft: "10px", backgroundColor: '#05b2d2' }}>
            Delete Customer
          </Button>
        </div>

        {/* <Typography variant="h5" style={{ marginTop: "20px", marginBottom: "10px" }}>
          All Customers:
        </Typography> */}
        <Box style={{ marginTop: "20px", marginBottom: "20px", borderBottom: "2px solid #838889", paddingBottom: "5px" }}>
          <Typography variant="h5" style={{  color: '#838889' }}>
            All Customers:
          </Typography>
        </Box>
        <TableContainer component={Paper} style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.cerdentional.userName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CustomerList;