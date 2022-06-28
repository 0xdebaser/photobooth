import React from "react";
import NavbarButton from "./NavbarButton";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm" id="nav-main">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-brand">fizzgen</span>
          <ul className="navbar-nav">
            {!props.isLoggedIn && <NavbarButton label="register" />}
            {!props.isLoggedIn && (
              <NavbarButton label="login" handler={props.loginToggle} />
            )}
            {props.isLoggedIn && <NavbarButton label="gallery" />}
            {props.isLoggedIn && (
              <NavbarButton label="logout" handler={props.loginToggle} />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
