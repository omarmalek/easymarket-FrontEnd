import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ServerError from "../ServerError";

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
    const url = `http://localhost:8080/api/controloldorders/${pageIndex}/${pageSize}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setOldOrders(data);
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
      <h1 className="page-title">الطلبات السابقة </h1>
      <OrderView orders={oldOrders} />
    </div>
  );
}
