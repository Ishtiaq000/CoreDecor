import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ variant }) {
  return (
    <Spinner
      animation="border"
      variant={variant}
      role="status"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default Loader;
