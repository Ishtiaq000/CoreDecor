import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetPassword } from "../actions/userActions";

function ResetPasswordScreen({ history }) {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const passwordReset = useSelector((state) => state.passwordReset);
  const { loading, error } = passwordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("Submitted");
    dispatch(resetPassword(email));
    window.alert("Reset link will be sent to your email")

    history.push("/")
  };

  return (
    <FormContainer>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Reset Password</h2>
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

        

        <Button type="Submit" variant="primary" className="mt-4">
            Reset
        </Button>
      </Form>

    </FormContainer>
  );
}

export default ResetPasswordScreen;
