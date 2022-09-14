import React from "react";
import { useGlobalContext } from "./context";
import cartLogo from "./images/cart.png";
import { FaTimes } from "react-icons/fa";
import { links, social } from "./data";

const Cart = () => {
  const { isCartOpen, closeCart } = useGlobalContext();

  return (
    <aside className={`${isCartOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <img src={cartLogo} className="logo" alt="coding addict" />
        <button className="close-btn" onClick={closeCart}>
          <FaTimes />
        </button>
      </div>
    </aside>
  );
};
export default Cart;
