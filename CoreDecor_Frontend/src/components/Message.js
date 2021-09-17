import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, fontColor, children }) {
  return (
    <Alert
      variant={variant}
      style={{
        color: fontColor,
      }}
    >
      {children}
    </Alert>
  );
}

export default Message;
