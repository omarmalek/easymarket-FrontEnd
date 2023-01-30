import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import PaginationControl from "./PaginationControl";
import HeaderControl from "./Header-Control";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderControlPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [controlOrders, setControlOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchControlOrders();
  }, [page]);

  const fetchControlOrders = async () => {
    let pageIndex = page - 1;
    let pageSize = 10;

    try {
      const url = `http://localhost:8080/admin/controlorders/${pageIndex}/${pageSize}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admintoken"),
        },
        withCredentials: true,
      });

      setLoading(false);
      setControlOrders(response.data);
    } catch (error) {
      if (!error.response) {
        console.log("Connection failed!");
      } else {
        if (error.response.status == 401) {
          console.log("unauthorized!");
          localStorage.removeItem("roleName");
          navigate("/admin");
        }
      }
      setLoading(false);
    }
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
  const role = "admin";
  return (
    <div>
      <HeaderControl />
      <h1 className="page-title">موظف الكونترول</h1>

      <OrderView orders={controlOrders} role={role} />
      <PaginationControl page={page} selectPage={selectPage} />
    </div>
  );
}
