import React, { useEffect, useState } from "react";
import HeaderControl from "./Header-Control";
import OrderDetails from "./order-details";

const OrderView = ({ orders, name, role }) => {
  const [currentOrder, setCurrentOrder] = useState({
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
    orderCart: [
      {
        id: 0,
        productId: 0,
        productName: "",
        unitPrice: "0",
        productAmount: "0",
        packType: "",
      },
    ],
    customerId: 0,
    orderSetterId: 0,
    deliveryManId: 0,
    delivaryCharge: 0,
    paymentType: 0,
    customerEvaluation: "0",
    controlNotes: "0",
    customerPhone: 0,
    customerAddress: "0",
  });

  return (
    <>
      <HeaderControl />
      <div className="order-view-component">
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
            {orders
              ? orders.map((order) => {
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
                    <>
                      <tr
                        key={id}
                        onClick={() => setCurrentOrder(order)}
                        className={
                          currentOrder.id === id ? "current-order" : ""
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
                      </tr>
                      {/* {currentOrder.id === id && (
                        // <OrderDetails currentOrder={currentOrder} role={role} />
                      )} */}
                    </>
                  );
                })
              : "لا توجد بيانات لعرضها"}
          </tbody>
        </table>
        <OrderDetails currentOrder={currentOrder} role={role} />
      </div>
    </>
  );
};
export default OrderView;
