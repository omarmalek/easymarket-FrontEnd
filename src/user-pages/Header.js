import React, { useRef } from "react";
import logo from "../images/shopping-cart-bag-logo-260nw-small.png";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function Header() {
  const {
    showSearchBar,
    toggleNavbar,
    showNvbar,
    customer,
  } = useGlobalContext();

  const navbarRef = useRef(null);

  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-name">
          <img src={logo} alt="" />
          غزة ديليفري
        </Link>
      </div>

      <div className={showNvbar ? "navbar active" : "navbar"} ref={navbarRef}>
        <Link to="/" className="active">
          الصفحة الرئيسية
        </Link>
        <a href="#">العروض</a>
        <Link to="#">أسعار التوصيل</Link>
        <Link to={`/customerhistory/${customer.id}`}> الطلبات السابقة</Link>
      </div>

      <div className="icons">
        <i className="fa fa-bars" id="menu-bars" onClick={toggleNavbar}></i>
        <i
          className="fa fa-search"
          id="search-icon"
          onClick={showSearchBar}
        ></i>
        <Link to="#" className="fas fa-heart"></Link>
        <Link to="/login" className="fa-solid fa-user"></Link>
      </div>
    </header>
  );
}

export default Header;
