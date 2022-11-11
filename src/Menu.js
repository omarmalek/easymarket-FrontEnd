import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import cartLogo from "./images/red-simple-shopping-cart-icon-12.png";
//import style from "./index.css";

function Menu() {
  const {
    openCart,
    catgories,
    choosCatgory,
    isSearchBarshown,
    closeSerchBar,
    cartCount,
  } = useGlobalContext();
  // console.log("from menu >> isSearchBarshown is : " + isSearchBarshown);
  const handleSearch = () => {};

  return (
    <div className="menu-component">
      <div className="cart-toggle" onClick={openCart}>
        <i className="fas fa-shopping-cart">
          <span>{cartCount > 0 ? cartCount : ""}</span>
        </i>
      </div>

      <div className="select-container">
        <select
          className="select-class"
          onChange={(e) => choosCatgory(e.target.value)}
        >
          <option value="0">اختر التصنيف</option>
          {catgories && catgories !== undefined
            ? catgories.map((cat, index) => {
                return (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })
            : "No Cargory"}
        </select>
      </div>
      <div
        className={
          isSearchBarshown ? "search-bar show-search-bar" : "search-bar"
        }
      >
        <i className="fa fa-search fa-flip-horizontal" id="search-icon"></i>
        <input type="text" onChange={handleSearch} placeholder="ابحث هنا ..." />
        <i className="fa fa-times close-search-btn" onClick={closeSerchBar}></i>
      </div>
    </div>
  );
}
export default Menu;
