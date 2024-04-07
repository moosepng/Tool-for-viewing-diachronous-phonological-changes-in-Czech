import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/o-projektu" className="oprojektu">
            O Projektu
          </a>
        </li>
        <li className="nav-item">
          <a href="/seznam-slov" className="seznamslov">
            Seznam Slov
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
