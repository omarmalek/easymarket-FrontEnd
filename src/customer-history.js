import React, { useEffect, useState } from "react";
import Header from "./Header";

function CustomerHistory() {
  const [customerOrders, setCustomerOrders] = useState([
    {
      id: "0",
      customerName: "no name",
      cartTotal: "0",
      date: "0",
      packed: false,
      sentDelivery: false,
      delivered: false,
      cancelled: false,
      rejected: false,
      delivaryServiceType: "0",
      orderCart: [],
      customerId: 0,
      orderSetterId: 0,
      deliveryManId: 0,
      delivaryCharge: 0,
      paymentType: 0,
      customerEvaluation: "0",
      controlNotes: "0",
      customerPhone: 0,
      customerAddress: "0",
    },
  ]);

  useEffect(() => {
    fetchCustomerOrders();
  }, []);
  const fetchCustomerOrders = () => {
    let customerid = 4;
    let pageIndex = 0;
    let pageSize = 10;
    // setLoading(true);
    try {
      let list = fetch(
        `http://localhost:8080/api/customerorders/${customerid}/${pageIndex}/${pageSize}`
      )
        .then((response) => response.json())
        .then((data) => setCustomerOrders(data));
    } catch (error) {
      console.log("Error in fetchCatgories: " + error);
      // setLoading(false);
    }
  };

  return (
    <div className="customer-history-component">
      <Header />
      <br></br>
      <br></br>
      {customerOrders.map((order) => {
        const {
          //here we will take just the important info
          id,
          customerId,
          orderSetterId,
          deliveryManId,
          delivaryCharge,
          cartTotal,
          date,
          paymentType,
          delivaryServiceType,
          packed,
          sentDelivery,
          delivered,
          paid,
          cancelled,
          rejected,
          customerEvaluation,
          controlNotes,
          customerName,
          customerPhone,
          customerAddress,
        } = order;
        return (
          <div key={id} className="customer-history-Component">
            <h4>Order id is: {id}</h4>
            <h4>{customerName}</h4>
          </div>
        );
      })}
    </div>
  );
}
export default CustomerHistory;
