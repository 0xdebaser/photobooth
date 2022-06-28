import React from "react";
import NavbarButton from "./NavbarButton";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm" id="nav-main">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-brand">fizzgen</span>
          <ul className="navbar-nav">
            <li className="nav-item ms-2 mt-1">
              {!props.isLoggedIn && <NavbarButton label="register" />}
            </li>
            <li className="nav-item ms-2 mt-1">
              {!props.isLoggedIn && (
                <NavbarButton label="login" handler={props.loginToggle} />
              )}
            </li>
            <li className="nav-item ms-2 mt-1">
              {props.isLoggedIn && <NavbarButton label="gallery" />}
            </li>
            <li className="nav-item ms-2 mt-1">
              {props.isLoggedIn && (
                <NavbarButton label="logout" handler={props.loginToggle} />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
