import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ServerError from "../ServerError";
import HeaderControl from "./Header-Control";
import axios from "axios";

export default function OrderOld() {
  const [loading, setLoading] = useState(true);
  const [serverStuck, setServerStuck] = useState(false);
  const [oldOrders, setOldOrders] = useState([]);
  useEffect(() => {
    fetchSetterOrders();
  }, []);
  const fetchSetterOrders = async () => {
    let pageIndex = 0;
    let pageSize = 10;
    try {
      const url = `http://localhost:8080/admin/controloldorders/${pageIndex}/${pageSize}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admintoken"),
        },
        withCredentials: true,
      });
      setLoading(false);
      setOldOrders(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setServerStuck(true);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (serverStuck) {
    return <ServerError />;
  }
  return (
    <div>
      <HeaderControl />
      <h1 className="page-title">الطلبات السابقة </h1>
      <OrderView orders={oldOrders} />
    </div>
  );
}
