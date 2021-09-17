import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Carousel,
  CarouselItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import NumberToPKR from "../components/NumberToPKR";
import { listProductDetails } from "../actions/productActions";
// import axios from "axios";
// import products from "../products";

function ProductScreen({ match, history }) {
  window.scrollTo(0, 0) 

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  // const product = products.find((p) => p._id === match.params.id);
  // const [product, setProduct] = useState([]); // products is a state and setProducts is used to update that state/array

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    // console.log("Use effect triggered")
    // async function fetchProduct() {
    //   // Async function not need to be realtime necessarily
    //   // const { data } = await axios.get("http://127.0.0.1:8000/api/products/")
    //   const { data } = await axios.get(`/api/products/${match.params.id}`); // http://127.0.0.1:8000/ is added in package.json as "proxy":"http://127.0.0.1:8000/"
    //   setProduct(data);
    // }
    // fetchProduct();
  }, [dispatch, match, successUpdate]); // It's loaded every time when the component loads or state value gets updated
  // // [] because we want this to update when the component loads not when actual state element gets updated

  // const product = {};

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <Loader variant={"primary"} />
      ) : error ? (
        <Message variant={"danger"} fontColor={"white"}>
          {error}
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Carousel>
              {product.image === undefined
                ? console.log(product.image)
                : product.image.map((x, idx) => (
                    <CarouselItem key={idx}>
                      <Image src={x} alt={product.title} fluid />
                      {/* fluid is used to display the image properly */}
                    </CarouselItem>
                  )) /* Ternary condition purpose is to avoid error which I get whenever state is empty in the start of reloading */}
            </Carousel>

            {/* {console.log(product.image)} */}
            {/* {<h2>{product.image}</h2>} */}
            {/* {<Image src={process.env.PUBLIC_URL + product.images[0]} fluid />} */}
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              {" "}
              {/* Add the flush variant to remove outer borders and rounded corners to render list group items edge-to-edge in a parent container */}
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>PKR {product.price && NumberToPKR(product.price)}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush" style={{fontSize:"18px"}}>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>PKR {product.price && NumberToPKR(product.price)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Category:</Col>
                    <Col>
                      {product.category && product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}{" "}
                      {/* capitalizeFirstLetter, https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript?page=1&tab=votes#tab-top */}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col className="ml-3 mr-4">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          style={{color:"black"}}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
