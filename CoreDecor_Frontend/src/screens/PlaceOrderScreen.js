import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import NumberToPKR from "../components/NumberToPKR";
import { createOrder } from "../actions/orderActions";
import { savePaymentMethod } from "../actions/cartActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const salesTax = 0;
  const shippingCost = 0;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  cart.itemsPrice = Number(
    cart.cartItems
      .reduce((accumulator, item) => accumulator + item.qty * item.price, 0)
      .toFixed(2)
  );

  cart.taxPrice = Number((salesTax * cart.itemsPrice).toFixed(2));

  cart.shippingPrice = Number(shippingCost);

  cart.totalPrice = Number(
    (cart.itemsPrice + cart.taxPrice + cart.shippingPrice).toFixed(2)
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [dispatch, success, history]); // This will trigger when success or history changes

  // console.log(cart.cartItems);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    dispatch(savePaymentMethod(paymentMethod));
    // history.push("/payment/")
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>SHIPPING ADDRESS</h3>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>PAYMENT METHOD</h3>

              <Form>
                <Form.Group>
                  <Col>
                    <Form.Check
                      type="radio"
                      label={
                        <p>
                          Credit Card <i className="fas fa-credit-card"></i>
                        </p>
                      }
                      id="creditCard"
                      name="paymentMethod"
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              </Form>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>ORDER PRODUCTS</h3>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x PKR {NumberToPKR(item.price)} = PKR{" "}
                          {NumberToPKR((item.qty * item.price).toFixed(2))}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h3>ORDER SUMMARY</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Products:</Col>
                  <Col>PKR {NumberToPKR(cart.itemsPrice)}</Col>
                </Row>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>PKR {NumberToPKR(cart.shippingPrice)}</Col>
                </Row>
                <Row>
                  <Col>Tax:</Col>
                  <Col>PKR {NumberToPKR(cart.taxPrice)}</Col>
                </Row>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>PKR {NumberToPKR(cart.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger" fontColor="black">
                    {error}
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
