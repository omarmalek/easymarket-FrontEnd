import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links } from "../data";
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

  const linksContainerRef = useRef(null);
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
        {/* <a href="#">العروض</a> */}
        <Link to="#">أسعار التوصيل</Link>
        <Link to={`/customerhistory/${customer.id}`}> الطلبات السابقة</Link>
        <Link to="/control">Control</Link>
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

export default Header;
