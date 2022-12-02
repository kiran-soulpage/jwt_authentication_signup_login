import { useState } from "react";
// import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
// import Cookies from "js-cookie";

import React, { Component } from "react";
function Signup() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const userDetails = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.xtoken);
    localStorage.setItem("user_token", data.xtoken);
  };

  return (
    <Container fluid="md">
      <div className="row ">
        <Col md={{ span: 4, offset: 4 }}>
          {/* <form > */}
          <h3 className="text-center">Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="d-grid">
                <button type="submit">Sign Up</button>
              </div> */}
          <button onClick={userDetails} className="btn btn-primary d-grid">
            Register
          </button>
          {/* </form> */}
        </Col>
      </div>
    </Container>
  );
}

export default Signup;
