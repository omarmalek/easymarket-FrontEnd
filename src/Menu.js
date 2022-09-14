import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import cartLogo from "./images/cart.png";
//import style from "./index.css";

function Menu() {
  const { openCart, catgories, catgory, handleCatgory } = useGlobalContext();

  return (
    <div className="menu-component">
      <select
        className=" select-class"
        onChange={(e) => handleCatgory(e.target.value)}
      >
        <option value="0">Select Catgory</option>
        {catgory && catgory !== undefined
          ? catgories.map((cat, index) => {
              return (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              );
            })
          : "No Cargory"}
      </select>

      {/* //icon cart ...link to cart */}
      <button className="sidebar-toggle " onClick={openCart}>
        <img src={cartLogo} alt="cart" />
      </button>
    </div>
  );
}
export default Menu;
