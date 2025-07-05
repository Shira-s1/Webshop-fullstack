import axios from "axios";
import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/auth/login", credentials)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Invalid credentials");
      });
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#2fb2ca" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Registration
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#838889' }}>Login</Typography>
            <TextField
              label="Username"
              name="userName"
              variant="outlined"
              value={credentials.userName}
              onChange={handleChange}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              style={{ marginBottom: "10px", marginRight: "10px", width: '200px' }}
            />
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" color="primary" onClick={handleLogin} style={{ backgroundColor: '#718c91' }}>
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Registration;