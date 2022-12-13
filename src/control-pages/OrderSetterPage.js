import React from "react";
import OrderView from "./order-view";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function OrderSetterPage() {
  const [loading, setLoading] = useState(true);
  const [setterOrders, setSetterOrders] = useState([
    // {
    //   id: "0",
    //   customerId: "0",
    //   orderSetterId: "0",
    //   deliveryManId: "0",
    //   delivaryCharge: "0",
    //   OrderCart: [{}],
    //   cartTotal: "0",
    //   date: "0",
    //   paymentType: "0",
    //   delivaryServiceType: "0",
    //   packed: "0",
    //   sentDelivery: "0",
    //   delivered: "0",
    //   paid: "0",
    //   cancelled: "0",
    //   rejected: "0",
    //   customerEvaluation: "0",
    //   controlNotes: "0",
    //   customerName: "0",
    //   customerPhone: "0",
    //   customerAddress: "0",
    // },
  ]);
  useEffect(() => {
    fetchSetterOrders();
  }, []);
  const fetchSetterOrders = async () => {
    let pageIndex = 0;
    let pageSize = 10;

    try {
      const response = await fetch(
        `http://localhost:8080/api/setterorders/${pageIndex}/${pageSize}`
      );
      const data = await response.json();
      setLoading(false);
      setSetterOrders(data);
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
      <h1 className="page-title">موظف التجهيز</h1>
      <OrderView orders={setterOrders} role={"setterEmployee"} />
    </div>
  );
}
