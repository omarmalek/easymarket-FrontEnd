import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./user-pages/Customer";
import AddProduct from "./control-pages/add-product";
import CustomerHistory from "./user-pages/customer-history";
import SearchResult from "./control-pages/Search-result";
import OrderSetterPage from "./control-pages/OrderSetterPage";
import OrderControlPage from "./control-pages/OrderControlPage";
import OrderOldPage from "./control-pages/OrderOldPage";
import ErrorPage from "./ErrorPage";
import Register from "./Register";
import Delivery from "./control-pages/Delivery";
import SignUp from "./user-pages/SignUp";
import Login from "./user-pages/Login";
import Footer from "./Footer";
import AdminLogin from "./control-pages/AdminLogin";
import AdminPage from "./control-pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Customer />} />
        <Route exact path="/customerhistory" element={<CustomerHistory />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admin/orders" element={<OrderControlPage />} />
        <Route exact path="/admin/main" element={<AdminPage />} />
        <Route exact path="/admin/ordres-old" element={<OrderOldPage />} />
        <Route exact path="/reg" element={<Register />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin/addproduct" element={<AddProduct />} />;
        <Route exact path="/admin/searchresult" element={<SearchResult />} />
        <Route exact path="/set" element={<OrderSetterPage />} />
        <Route exact path="/dv" element={<Delivery />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
