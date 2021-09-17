import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetPasswordConfirm } from "../actions/userActions";

function ResetPasswordConfirmScreen({ match, history }) {

  const [new_password, setNewPassword] = useState("");
  const [re_new_password, setReNewPassword] = useState("");

  const dispatch = useDispatch();

  const passwordResetConfirm = useSelector((state) => state.passwordResetConfirm);
  const { loading, error } = passwordResetConfirm;

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("Submitted");

    const uid = match.params.uid;
    const token = match.params.token;

    dispatch(resetPasswordConfirm(uid, token, new_password, re_new_password));
    window.alert("Password Changed")

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
      <Form.Group controlId="new_password" className="mt-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="re_new_password" className="mt-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm New Password"
            value={re_new_password}
            onChange={(e) => setReNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        

        <Button type="Submit" variant="primary" className="mt-4">
            Reset
        </Button>
      </Form>

    </FormContainer>
  );
}

export default ResetPasswordConfirmScreen;
