import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <span> 😀게시판만들기😀 </span>
        <Link className="navLink" to={"/"}>
          메뉴1
        </Link>
        <Link className="navLink" to={"/"}>
          메뉴2
        </Link>
        <Link className="navLink" to={"/"}>
          메뉴3
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
