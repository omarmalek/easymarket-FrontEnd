import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/ordres-old">OldOrders</Link>
      <Link to="/admin/addproduct">newProduct</Link>
      <Link to="/admin/searchresult">search</Link>
    </div>
  );
};

export default AdminPage;
