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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Customer />} />
        <Route exact path="/control" element={<OrderControlPage />} />
        <Route exact path="/control/old" element={<OrderOldPage />} />
        <Route exact path="/set" element={<OrderSetterPage />} />
        <Route
          exact
          path="/customerhistory/:customerid"
          element={<CustomerHistory />}
        />
        <Route exact path="/addproduct" element={<AddProduct />} />;
        <Route exact path="/control/searchresult" element={<SearchResult />} />
        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="/dev" element={<Delivery />} /> */}
        <Route exact path="/reg" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
