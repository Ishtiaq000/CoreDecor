import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Carousel, CardDeck } from "react-bootstrap";
import { listTopRatedProducts } from "../actions/productActions";
import NumberToPKR from "./NumberToPKR"
import Loader from "./Loader";
import Message from "./Message";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" fontColor="black">
      /
    </Message>
  ) : (
    <Carousel
      pause="hover"
      style={{
        // backgroundImage: `url("https://i.postimg.cc/gkQ0gqhd/dLB5ai0.jpg")`,
      }}
    >
      {products.map((product) => (
        <Carousel.Item
          key={product._id}
          className="product-carousel product-carousel-item-next product-carousel-item-prev product-carousel-item.active"
        >
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="product-carousel-caption">
              <h4>
                {product.name} | PKR {NumberToPKR(product.price)}
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
