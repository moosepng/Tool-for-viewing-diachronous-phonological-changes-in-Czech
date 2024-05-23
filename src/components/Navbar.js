import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Úvod</Link>
        </li>
        <li>
          <Link to="/o-projektu">O Projektu</Link>
        </li>
        <li>
          <Link to="/seznam-slov">Seznam Slov</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
