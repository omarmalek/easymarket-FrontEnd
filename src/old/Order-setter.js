import React, { useEffect, useState } from "react";
import OrderSetterDetails from "./Order-setter-details";
import { useGlobalContext } from "./context";
import HeaderControl from "./Header-Control";

let log = console.log;
const OrderSetter = () => {
  const {
    orders,
    controlOrders,
    showSetterOrderDetails,
    currentOrder,
    setterOrders,
    currentSetterOrder,
  } = useGlobalContext();
  console.log("fetching setterOrders from database:&&&&&&&&&&&&&&&");
  console.log(setterOrders);
  return (
    <>
      <HeaderControl />
      <div className="order-setter-component">
        <div className="order-setter-header">
          <br></br> <br></br>
          <h1>موظف تجهيز الطلبيات</h1>
          <h3>Orders setter</h3>
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

              <th>فئة التوصيل</th>
            </tr>
          </thead>
          <tbody>
            {setterOrders !== null && setterOrders !== undefined
              ? setterOrders.map((order) => {
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

                    customerEvaluation,
                    controlNotes,
                    customerName,
                    customerPhone,
                    customerAddress,
                  } = order;

                  return (
                    <tr
                      key={id}
                      onClick={() => showSetterOrderDetails(id)}
                      className={
                        currentSetterOrder.id === id ? "current-order" : ""
                      }
                    >
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{id}</td>
                      <td>{customerName}</td>
                      <td>{cartTotal}</td>
                      <td>{date}</td>
                      <td className={packed ? "selected" : ""}>
                        {packed ? "yes" : "No"}
                      </td>

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
