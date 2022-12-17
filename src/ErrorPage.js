import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h>ErrorPage</h>
      <h3>
        <Link to="/">عودة الى الصفحة الرئيسية</Link>
      </h3>
    </div>
  );
};

export default ErrorPage;
