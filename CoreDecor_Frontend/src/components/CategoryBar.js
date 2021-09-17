import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../actions/productActions'

function CategoryBar() {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const dispatch = useDispatch();

  const permittedValues = products.map((value) => value.category);
  const categoryList = [...new Set(permittedValues)];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="#home" style={{ marginLeft: "10%" }}></Navbar.Brand>
        <Nav className="mr-auto">
          {categoryList.map((category) => (
            <Nav.Link href={`/?keyword=${category}`}>
              {category.toUpperCase()}S
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default CategoryBar;

//ok `
