import React, { useEffect, useState } from "react";
import OrderSetterDetails from "./Order-setter-details";
import { useGlobalContext } from "./context";
import Header from "./Header";

let log = console.log;
const OrderSetter = () => {
  const { orders, controlOrders, showOrderDetails } = useGlobalContext();
  console.log("fetching orders from database:&&&&&&&&&&&&&&&");
  console.log(controlOrders);
  return (
    <>
      <Header />
      <div className="order-setter-component">
        <div className="order-setter-header">
          <br></br> <br></br>
          <br></br>
          <br></br>
          <h1>Orders setter</h1>
          <i className="somelogo"></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>م</th>
              <th>رقم الطلبية</th>
              <th>اسم الزبون</th>
              <th>مبلغ الطلبية</th>
              <th>وقت الطلب</th>
              <th>تم التحضير</th>
              <th>تم التسليم</th>
              <th>ملغاة</th>
              <th>مرفوضة</th>
              <th>فئة التوصيل</th>
            </tr>
          </thead>
          <tbody>
            {controlOrders !== null && controlOrders !== undefined
              ? controlOrders.map((order) => {
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
                    isPacked,
                    isDelivared,
                    isPaid,
                    isCancelled,
                    isRejected,
                    customerEvaluation,
                    controlNotes,
                    customerName,
                    customerPhone,
                    customerAddress,
                  } = order;

                  return (
                    <tr key={id} onClick={() => showOrderDetails(id)}>
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{id}</td>
                      <td>{customerName}</td>
                      <td>{cartTotal}</td>
                      <td>{date}</td>
                      <td>{isPacked ? "yes" : "No"}</td>
                      <td>{isDelivared ? "yes" : "No"}</td>
                      <td>{isCancelled ? "yes" : "No"}</td>
                      <td>{isRejected ? "yes" : "No"}</td>
                      <td>{delivaryServiceType}</td>
                      <td></td>
                    </tr>
                  );
                })
              : "no list to view"}
          </tbody>
        </table>
        <OrderSetterDetails />
      </div>
    </>
  );
};
export default OrderSetter;
