import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, editUser } from "../actions/userActions";
import { USER_EDIT_RESET } from "../constants/userConstants";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user || user._id !== Number(userId)) {
        // Number(userId), because userId is of string type
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, successEdit, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/userlist">Back</Link>
      <FormContainer>
        <h2 style={{ display: "flex", justifyContent: "center" }}>EDIT USER</h2>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant="danger" fontColor="black">{errorEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" fontColor="black">
            {error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="Submit" variant="primary" className="mt-4">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
