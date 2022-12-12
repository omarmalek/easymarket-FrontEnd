import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./user-pages/Customer";
import AddProduct from "./control-pages/add-product";

import OrderView from "./control-pages/order-view";
import CustomerHistory from "./user-pages/customer-history";
import SearchResult from "./control-pages/Search-result";
import Footer from "./Footer";

import { useGlobalContext } from "./context";
import OrderSetterPage from "./control-pages/OrderSetterPage";
import OrderControlPage from "./control-pages/OrderControlPage";

function App() {
  const { controlOrders, setterOrders, controlOldOrders } = useGlobalContext();
  //const showCart = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Customer />} />
        <Route exact path="/control" element={<OrderControlPage />} />
        <Route exact path="/control/old" element={<OrderControlPage />} />
        <Route exact path="/set" element={<OrderSetterPage />} />
        <Route
          exact
          path="/customerhistory/:customerid"
          element={<CustomerHistory />}
        />
        <Route exact path="/addproduct" element={<AddProduct />} />;
        <Route exact path="/control/searchresult" element={<SearchResult />} />
        {/* <Route path="/dev" element={<Delivery />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
