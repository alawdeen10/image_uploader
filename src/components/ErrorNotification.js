import React from "react";

const ErrorNotification = ({ error }) => {
  return (
    <div className="error__notification">
      <p>{error}</p>
    </div>
  );
};

export default ErrorNotification;
