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

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({ id: "", name: "" });
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/companies/getAll", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Error fetching companies:", error));
  };

  const addCompany = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/companies/post", newCompany, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Company added successfully!");
        setNewCompany({ id: "", name: "" });
        fetchCompanies();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("Error adding company:", error);
          alert("Error adding company. Please try again.");
        }
      });
  };

  const updateCompany = () => {
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:8080/companies/put", newCompany, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Company updated successfully!");
        setNewCompany({ id: "", name: "" });
        fetchCompanies();
      })
      .catch((error) => console.error("Error updating company:", error));
  };

  const deleteCompany = () => {
    if (!searchId) {
      alert("Please enter a company ID to delete.");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/companies/delete/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Company deleted successfully!");
        setSearchId("");
        fetchCompanies();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("Error deleting company:", error);
          alert("Error deleting company. Please try again.");
        }
      });
  };

  const searchCompanyById = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/companies/getById/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data) {
          setNewCompany(response.data);
        } else {
          alert("Company not found");
        }
      })
      .catch((error) => console.error("Error fetching company by ID:", error));
  };

  const searchCompanyByName = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/companies/getByName/${searchName}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data) {
          setNewCompany(response.data);
        } else {
          alert("Company not found");
        }
      })
      .catch((error) => console.error("Error fetching company by name:", error));
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#2fb2ca" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#838889' }}>Add a New Company:</Typography>
            
            <TextField
              label="ID"
              variant="outlined"
              value={newCompany.id}
              onChange={(e) => setNewCompany({ ...newCompany, id: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
              size="small"
            />
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" color="success" onClick={addCompany} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Add Company
              </Button>
              <Button variant="contained" color="primary" onClick={updateCompany} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
                Update Company
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
          <Button variant="contained" color="info" onClick={searchCompanyById} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
            Search by ID
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ marginBottom: "10px", width: '200px' }}
            size="small"
          />
          <Button variant="contained" color="info" onClick={searchCompanyByName} style={{ marginRight: "10px", backgroundColor: '#718c91' }}>
            Search by Name
          </Button>
        </div>

        <Button variant="contained" color="error" onClick={deleteCompany} style={{ marginLeft: "10px", backgroundColor: '#05b2d2' }}>
          Delete Company
        </Button>

        {/* <Typography variant="h5" style={{ marginTop: "20px", marginBottom: "10px" }}>
          All Companies:
        </Typography> */}
        <Box style={{ marginTop: "20px", marginBottom: "20px", borderBottom: "2px solid #838889", paddingBottom: "5px" }}>
          <Typography variant="h5" style={{  color: '#838889' }}>
             All Companies:
          </Typography>
          </Box>
        <TableContainer component={Paper} style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CompanyList;