import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import OrderControl from "./OrderControl";
import OrderSetter from "./Order-setter";

function App() {
  const showCart = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/cont" element={<OrderControl />} />
        <Route path="/set" element={<OrderSetter />} />
        {/* <Route path="/dev" element={<Delivery />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
