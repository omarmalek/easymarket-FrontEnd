import React, { useEffect, useState } from "react";
// import OrderContolOldDetails from "./Order-control-details";
import { useGlobalContext } from "./context";
import HeaderControl from "./Header-Control";

let log = console.log;
const OrderOldControl = () => {
  const { controlOldOrders, showContolOrderDetails, currentControlOrder } =
    useGlobalContext();
  //console.log("fetching orders from database:&&&&&&&&&&&&&&&");
  //console.log(controlOldOrders);
  return (
    <>
      <HeaderControl />
      <div className="order-control-component">
        <div className="order-control-header">
          <br></br> <br></br>
          <h1>Old Orders</h1>
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
              <th> ارسل ديلفيري</th>
              <th>تم التوصيل</th>
              <th>ملغاة</th>
              <th>مرفوضة</th>
              <th>فئة التوصيل</th>
            </tr>
          </thead>
          <tbody>
            {controlOldOrders !== null && controlOldOrders !== undefined
              ? controlOldOrders.map((order) => {
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
                    <tr
                      key={id}
                      onClick={() => showContolOrderDetails(id)}
                      className={
                        currentControlOrder.id === id ? "current-order" : ""
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
                      <td className={sentDelivery ? "selected" : ""}>
                        {sentDelivery ? "yes" : "No"}
                      </td>
                      <td className={delivered ? "selected" : ""}>
                        {delivered ? "yes" : "No"}
                      </td>
                      <td className={cancelled ? "selected" : ""}>
                        {cancelled ? "yes" : "No"}
                      </td>
                      <td className={rejected ? "selected" : ""}>
                        {rejected ? "yes" : "No"}
                      </td>
                      <td>{delivaryServiceType}</td>
                      <td></td>
                    </tr>
                  );
                })
              : "no list to view"}
          </tbody>
        </table>
        {/* <OrderSetterDetails /> */}
      </div>
    </>
  );
};
export default OrderOldControl;
