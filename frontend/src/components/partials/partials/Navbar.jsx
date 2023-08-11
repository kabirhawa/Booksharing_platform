import React from "react";
import "../styles/Navbar.css"
import { FaUser } from "react-icons/fa"
import { MdLogin } from "react-icons/md"
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">BookSharing Platform</div>
        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <div className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/">Contact</Link>
              {/* <FaUser /> */}
            </li>
            <li className="services">
              <Link to="/">Services</Link>
              <ul className="dropdown">
                <li>
                  <Link to="/">Dropdown 1 </Link>
                </li>
                <li>
                  <Link to="/">Dropdown 2</Link>
                </li>
                <li>
                  <Link to="/">Dropdown 2</Link>
                </li>
                <li>
                  <Link to="/">Dropdown 3</Link>
                </li>
                <li>
                  <Link to="/">Dropdown 4</Link>
                </li>
              </ul>
            </li>
            <li>
             <FaUser /> <Link to="/register">Register</Link>
            </li>
            <li>
             <MdLogin /> <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
