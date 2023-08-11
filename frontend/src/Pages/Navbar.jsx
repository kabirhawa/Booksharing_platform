import React from "react";
import "./Navbar.css"
import { FaUser } from "react-icons/fa"
import { MdLogin } from "react-icons/md"


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
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/">Contact</a>
              {/* <FaUser /> */}
            </li>
            <li className="services">
              <a href="/">Services</a>
              <ul className="dropdown">
                <li>
                  <a href="/">Dropdown 1 </a>
                </li>
                <li>
                  <a href="/">Dropdown 2</a>
                </li>
                <li>
                  <a href="/">Dropdown 2</a>
                </li>
                <li>
                  <a href="/">Dropdown 3</a>
                </li>
                <li>
                  <a href="/">Dropdown 4</a>
                </li>
              </ul>
            </li>
            <li>
             <FaUser /> <a href="/">Register</a>
            </li>
            <li>
             <MdLogin /> <a href="/">Login</a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
