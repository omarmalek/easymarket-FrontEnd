import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links } from "./data";
import logo from "./images/shopping-cart-bag-logo-260nw-small.png";
import { useGlobalContext } from "./context";

function Header() {
  const {
    showSearchBar,
    toggleNavbar,
    showNvbar,
    customer,
  } = useGlobalContext();

  const linksContainerRef = useRef(null);
  const navbarRef = useRef(null);

  // useEffect(() => {
  //   if (showNvbar) {
  //     navbarRef.current.
  //   } else {
  //     navbarRef.current.style.
  //   }
  // }, [showNvbar]);
  return (
    //  header section starts
    <header>
      <div className="logo">
        <a href="/amabdo/" className="logo-name">
          <img src={logo} alt="" />
          غزة ديليفري
        </a>
      </div>

      <div className={showNvbar ? "navbar active" : "navbar"} ref={navbarRef}>
        <a href="/" className="active">
          الصفحة الرئيسية
        </a>
        {/* <a href="#">العروض</a> */}
        <a href="#">أسعار التوصيل</a>
        <a href={`/amabdo/customerhistory/${customer.id}`}> الطلبات السابقة</a>
        <a href="/amabdo/control">Control</a>
      </div>

      <div className="icons">
        <i className="fa fa-bars" id="menu-bars" onClick={toggleNavbar}></i>
        <i
          className="fa fa-search"
          id="search-icon"
          onClick={showSearchBar}
        ></i>
        <a href="#" className="fas fa-heart"></a>
        <i className="fa-solid fa-user"></i>
      </div>
    </header>
    // header section ends
    // <nav className="navbar" >

    //   <div className="container">
    //     <div className="navbar-logo">
    //       <img src={logo} className="logo-img" alt="logo" />
    //       <button className="nav-toggle" onClick={toggleLinks}>
    //         <FaBars />
    //       </button>
    //     </div>
    //     <div className="links-container" ref={linksContainerRef}>
    //       <ul className="links" ref={linksRef}>
    //
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Header;
