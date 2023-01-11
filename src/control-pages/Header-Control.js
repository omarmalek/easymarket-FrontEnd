import React from "react";

import logo from "../images/shopping-cart-bag-logo-260nw-small.png";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function HeaderControl() {
  const { showSearchBar, toggleNavbar, showNvbar } = useGlobalContext();

  // const linksContainerRef = useRef(null);
  // const navbarRef = useRef(null);

  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-name">
          <img src={logo} alt="" />
          غزة ديليفري
        </Link>
      </div>

      <div className={showNvbar ? "navbar active" : "navbar"}>
        <Link to="/admin">ادارة التطبيق</Link>
        <Link to="/admin/addproduct">اضافة منتج</Link>
        <Link to="/set">موظف التجهيز</Link>
        <Link to="/dv">موظف الديليفري</Link>
        <Link to="/admin/control-old">الطلبات السابقة</Link>
        <Link to="/admin/searchresult">بحث</Link>
      </div>

      <div className="icons">
        <i className="fa fa-bars" id="menu-bars" onClick={toggleNavbar}></i>
        <i
          className="fa fa-search"
          id="search-icon"
          onClick={showSearchBar}
        ></i>
        <Link to="#" className="fas fa-heart"></Link>
        <i className="fa-solid fa-user"></i>
      </div>
    </header>
  );
}

export default HeaderControl;
