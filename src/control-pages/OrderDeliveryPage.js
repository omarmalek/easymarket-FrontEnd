import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import PaginationControl from "./PaginationControl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderDeliveryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSetterOrders();
  }, [page]);

  const fetchSetterOrders = async () => {
    let pageIndex = page - 1;
    let pageSize = 10;
    try {
      const url = `http://localhost:8080/admin/deliveryorders/${pageIndex}/${pageSize}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admintoken"),
        },
        withCredentials: true,
      });
      setLoading(false);
      setDeliveryOrders(response.data);
    } catch (error) {
      if (!error.response) {
        console.log("Connection failed!");
      } else if (error.response.status === 401) {
        console.log("unauthorized!");
        localStorage.removeItem("roleName");
        navigate("/admin");
      } else if (error.response.status === 403) {
        console.log("forbidden!");
        localStorage.removeItem("roleName");
        navigate("/admin");
      }

      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.setItem("admintoken", "");
    navigate("/admin");
  };
  const selectPage = (pageLabel) => {
    setPage(pageLabel);
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const role = "delivery";
  return (
    <div>
      <h1 className="page-title">موظف الديليفري</h1>
      <div className="logout">
        <button type="button" onClick={logout}>
          تسجيل الخروج
        </button>
      </div>
      <OrderView orders={deliveryOrders} role={role} />
      <PaginationControl page={page} selectPage={selectPage} />
    </div>
  );
}
