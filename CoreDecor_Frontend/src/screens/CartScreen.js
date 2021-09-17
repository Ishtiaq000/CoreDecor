import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // It will give ?qty=1 or 2 .etc.
  // console.log("qty: ", qty)

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartItems: ", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h3>SHOPPING CART</h3>
        {cartItems.length === 0 ? (
          <Message variant="primary" fontColor="red">
            <h5>Your cart is empty</h5>
            <Link to="/"> Go to Home Page</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {" "}
            {/* flush, to remove borders */}
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>PKR {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h3>SUBTOTAL</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Products Quantity:</Col>
                <Col>
                  {cartItems.reduce(
                    (accumulator, item) => accumulator + item.qty,
                    0
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Price (Without Tax): </Col>
                <Col>
                  PKR{" "}
                  {cartItems
                    .reduce(
                      (accumulator, item) =>
                        accumulator + item.qty * item.price,
                      0
                    )
                    .toFixed(2)}
                  {/* A reducer is a function which takes two arguments — the current state 
                and an action — and returns based on both arguments a new state. 
                accumulator is initialized to 0
                .toFixed(2) is used to set max decimal places to the right */}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="button"
                className="btn-block" // Full width button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
