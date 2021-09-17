import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("Submitted");
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Log In</h2>
      {loading && <Loader />}
      {error && (
        <Message variant="danger" fontColor="black">
          {error}
        </Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Button type="Submit" variant="primary" className="mt-4">
          Sign In
        </Button>
      </Form>

      <Row>
        <Col>
          New User?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
        Forgot your Password?{" "}
        <Link to={"/resetpassword"}>
            Reset Password
        </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
