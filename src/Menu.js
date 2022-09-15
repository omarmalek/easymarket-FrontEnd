import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import cartLogo from "./images/cart2.png";
//import style from "./index.css";

function Menu() {
  const { openCart, getCatgoriesNames, catgory, handleCatgory } =
    useGlobalContext();
  return (
    <div className="menu-component">
      <div className="select-container">
        <select
          className=" select-class"
          onChange={(e) => handleCatgory(e.target.value)}
        >
          <option value="0">اختر التصنيف</option>
          {getCatgoriesNames && getCatgoriesNames !== undefined
            ? getCatgoriesNames.map((cat, index) => {
                return (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })
            : "No Cargory"}
        </select>
      </div>

      {/* //icon cart ...link to cart */}
      <button className="sidebar-toggle " onClick={openCart}>
        <img src={cartLogo} alt="cart" />
      </button>
    </div>
  );
}
export default Menu;
