import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function OrderControlPage() {
  const [loading, setLoading] = useState(true);
  const [controlOrders, setControlOrders] = useState([]);

  useEffect(() => {
    fetchControlOrders();
  }, []);

  const fetchControlOrders = async () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      const response = await fetch(
        `http://localhost:8080/api/controlorders/${pageIndex}/${pageSize}`
      );
      const data = await response.json();
      setLoading(false);
      setControlOrders(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <h1 className="page-title">موظف الكونترول</h1>
      <OrderView orders={controlOrders} role={"admin"} />
    </div>
  );
}
