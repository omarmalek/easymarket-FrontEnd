import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./user-pages/Customer";
import AddProduct from "./control-pages/add-product";
import CustomerHistory from "./user-pages/customer-history";
import SearchResult from "./control-pages/Search-result";
import Footer from "./Footer";

import OrderSetterPage from "./control-pages/OrderSetterPage";
import OrderControlPage from "./control-pages/OrderControlPage";
import OrderOldPage from "./control-pages/OrderOldPage";
import ErrorPage from "./ErrorPage";
import Register from "./Register";
import Delivery from "./control-pages/Delivery";
import CustomerLogin from "./user-pages/CustomerLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Customer />} />
        <Route exact path="/login" element={<CustomerLogin />} />
        <Route
          exact
          path="/customerhistory/:customerid"
          element={<CustomerHistory />}
        />
        <Route exact path="/admin" element={<OrderControlPage />} />
        <Route exact path="/admin/control-old" element={<OrderOldPage />} />
        <Route exact path="/admin/reg" element={<Register />} />
        <Route exact path="/admin/addproduct" element={<AddProduct />} />;
        <Route exact path="/admin/searchresult" element={<SearchResult />} />
        <Route exact path="/set" element={<OrderSetterPage />} />
        <Route path="/dv" element={<Delivery />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
