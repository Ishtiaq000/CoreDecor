import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import NumberToPKR from "./NumberToPKR";


function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <strong>{product.name}</strong>
        </Link>

        <Card.Text as="div">
          <div className="my-2">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h4" className="font-weight-bold">
          PKR {NumberToPKR(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
