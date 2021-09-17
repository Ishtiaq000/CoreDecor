import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import NumberToPKR from '../components/NumberToPKR'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant"; // Because we need to reset createProductReducer

function ProductListScreen({ match, history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });
    if (userInfo) {
      if (!userInfo.isAdmin) history.push("/login");
    }

    if (successCreate)
      history.push(`/admin/product/${createdProduct._id}/edit`);
    else dispatch(listProducts());
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successDelete,
    createdProduct,
  ]); // successDelete dependency added because we need to update product list whenever product deleted

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?"))
      dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Button className="my-3" onClick={createProductHandler}>
        <i className="fas fa-plus"></i> Create Product
      </Button>

      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message variant="danger" fontColor="black">
          {errorCreate}
        </Message>
      )}

      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message variant="danger" fontColor="black">
          {errorDelete}
        </Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>PKR {product.price && NumberToPKR(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <i>{"  "}</i>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductListScreen;
