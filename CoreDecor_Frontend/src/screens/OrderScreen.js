import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import NumberToPKR from "../components/NumberToPKR";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  if (!loading && !error) {
    order.itemsPrice = Number(
      order.orderItems
        .reduce((accumulator, item) => accumulator + item.qty * item.price, 0)
        .toFixed(2)
    );
  }

  useEffect(() => {
    if (!userInfo) history.push("/login");

    if (!order || Number(orderId) !== order._id || successDeliver) {
      dispatch({
        type: ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, history, order, orderId, successDeliver]); // This will trigger on when success or history changes

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId)); // Update isDelivered to true in the backend
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" fontColor="black">
      {error}
    </Message>
  ) : (
    <div>
      <h2>ORDER ID: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>SHIPPING ADDRESS</h3>
              <p>
                <strong>User: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success" fontColor="black">
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning" fontColor="black">
                  Not Delivered
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>PAYMENT METHOD</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod} <i className="fas fa-credit-card"></i>
              </p>
              {order.isPaid ? (
                <Message variant="success" fontColor="black">
                  Paid on {order.paidAt}
                </Message>
              ) : (
                <Message variant="warning" fontColor="black">
                  Not Paid
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>ORDER PRODUCTS</h3>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, index) => (
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
                  <Col>PKR {NumberToPKR(order.itemsPrice)}</Col>
                </Row>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>PKR {NumberToPKR(order.shippingPrice)}</Col>
                </Row>
                <Row>
                  <Col>Tax:</Col>
                  <Col>PKR {NumberToPKR(order.taxPrice)}</Col>
                </Row>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>PKR {NumberToPKR(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
