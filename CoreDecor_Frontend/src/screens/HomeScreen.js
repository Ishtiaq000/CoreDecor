import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import products from "../products";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategorizeProducts from "../components/CategorizeProducts";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // const [products, setProducts] = useState([]); // products is a state and setProducts is used to update that state/array
  let keyword = history.location.search;
  // console.log(keyword)

  useEffect(() => {
    dispatch(listProducts(keyword));

    //====== All of this is now happening in productActions.js =======
    // console.log("Use effect triggered")
    // async function fetchProducts() {
    //   // Async function not need to be realtime necessarily
    //   // const { data } = await axios.get("http://127.0.0.1:8000/api/products/")
    //   const { data } = await axios.get("api/products/"); // http://127.0.0.1:8000/ is added in package.json as "proxy":"http://127.0.0.1:8000/"
    //   setProducts(data);
    // }
    // fetchProducts();
  }, [dispatch, keyword]); // [] because we want this to update when the component loads not when actual state element gets updated
  // useEffect is loaded every time when the component loads or state value gets updated

  // const products = []

  const categorizedProducts = CategorizeProducts(products);

  // console.log(categorizedProducts);

  return (
    <div>
      {/* <h1>Latest Products</h1> */}
      {!keyword && <ProductCarousel />}
      {loading ? (
        <Loader variant={"primary"} />
      ) : error ? (
        <Message variant={"danger"} fontColor={"white"}>
          {error}
        </Message>
      ) : (
        <Row className="mt-3">
          {Object.entries(categorizedProducts).map(([key, value]) => {
            return [
              <button type="button" class="btn btn-outline-info">
                <h5>{key.toUpperCase()}S</h5>
              </button>,
              value.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )),
            ];
          })}
          {/* {
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))} */}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
