import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderControl from "./Header-Control";

const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const url = "/checkAdminAuthentication";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admintoken"),
        },
        withCredentials: true,
      });
    } catch (e) {
      if (!e.response) {
        console.log("Connection Failed");
      } else {
        localStorage.removeItem("roleName");
        navigate("/admin");
      }
    }
  };
  return (
    <div>
      <HeaderControl />
      <section>
        <br></br>
        <br></br>
        <h1>AdminPage</h1>
        <Link to="/admin/orders">Orders</Link>
        <br></br>
        <Link to="/admin/ordres-old">OldOrders</Link>
        <br></br>
        <Link to="/admin/addproduct">newProduct</Link>
        <br></br>
        <Link to="/admin/searchresult">search</Link>
      </section>
    </div>
  );
};

export default AdminPage;
