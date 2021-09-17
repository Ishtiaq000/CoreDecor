import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import NumberToPKR from "../components/NumberToPKR";
import { listOrders, deleteOrder } from "../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    userInfo && userInfo.isAdmin
      ? dispatch(listOrders())
      : history.push("/login");
  }, [dispatch, history, userInfo]); // successDelete dependency added because we need to update user list whenever user deleted

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?"))
      dispatch(deleteOrder(id));
      // console.log("order deleted")
  };
  return (
    <div>
      <h2>ORDERS</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>PKR {order.totalPrice && NumberToPKR(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "#32CD32" }}>
                      {" "}
                      {order.paidAt.substring(0, 10)}
                    </i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "#32CD32" }}>
                      {" "}
                      {order.deliveredAt.substring(0, 10)}
                    </i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                <i>{"  "}</i>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(order._id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}/`}>
                    <Button variant="light" className="button-sm">
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
