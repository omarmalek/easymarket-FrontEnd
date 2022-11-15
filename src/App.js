import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
//import OrderControl from "./OrderControl";
//import OrderSetter from "./Order-setter";

import OrderView from "./order-view";
import CustomerHistory from "./customer-history";

import { useGlobalContext } from "./context";

function App() {
  const { controlOrders, setterOrders, controlOldOrders } = useGlobalContext();
  //const showCart = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route
          path="/control"
          element={
            <OrderView
              orders={controlOrders}
              name={"إدارة التطبيق"}
              role={"admin"}
            />
          }
        />
        <Route
          path="/control/old"
          element={
            <OrderView
              orders={controlOldOrders}
              name={"الطلبات السابقة "}
              role={"admin"}
            />
          }
        />
        <Route
          path="/set"
          element={
            <OrderView
              orders={setterOrders}
              name={" موظف التجهيز"}
              role={"setter"}
            />
          }
        />
        <Route path="/customerhistory" element={<CustomerHistory />} />;
        {/* <Route path="/dev" element={<Delivery />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
