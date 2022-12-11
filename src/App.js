import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./user-pages/Customer";
import AddProduct from "./control-pages/add-product";

import OrderView from "./control-pages/order-view";
import CustomerHistory from "./user-pages/customer-history";
import SearchResult from "./control-pages/Search-result";

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
        <Route
          path="/customerhistory/:customerid"
          element={<CustomerHistory />}
        />
        <Route path="/addproduct" element={<AddProduct />} />;
        <Route path="/control/searchresult" element={<SearchResult />} />
        {/* <Route path="/dev" element={<Delivery />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
