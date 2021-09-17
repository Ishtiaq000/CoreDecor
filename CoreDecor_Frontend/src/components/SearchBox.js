import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}`);
    } else {
      history.push(history.push(history.location.pathname)); // if user has not written anything in the search box then stay on the same page
    }
  };

  return (
    <Form onSubmit={submitHandler} inline style={{ width: "70%" }}>
      <Row>
        <Col md={8}>
          <Form.Control
            type="text"
            name="search"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Col>
        <Col>
          <Button type="submit" variant="outline-light">
            <i className="fa fa-search pr-3" style={{color:"white"}} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
