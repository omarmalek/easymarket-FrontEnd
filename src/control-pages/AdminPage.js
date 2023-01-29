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
    const url = "http://localhost:8080/checkAdminAuthentication";

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admintoken"),
        },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      if (!error.response) {
        console.log("Connection Failed");
      } else {
        if (error.response.status == 401) {
          console.log("unauthorized!");
          localStorage.removeItem("roleName");
          navigate("/admin");
        }
      }
    }
  };
  const logout = () => {
    localStorage.setItem("admintoken", "");
    navigate("/admin");
  };
  return (
    <div>
      <HeaderControl />
      <section>
        <br></br>
        <br></br>
        <h1>AdminPage</h1>
        <div className="logout">
          <button type="button" onClick={logout}>
            تسجيل الخروج
          </button>
        </div>
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
