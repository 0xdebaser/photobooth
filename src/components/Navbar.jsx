import React from "react";
import NavbarButton from "./NavbarButton";
import LoginButton from "./LoginButton";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm" id="nav-main">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fs-2 text-brand">fizzgen</span>
          <ul className="navbar-nav">
            {!props.isLoggedIn && (
              <NavbarButton label="register" modal="#registerModal" />
            )}
            {props.isLoggedIn && <NavbarButton label="gallery" />}
            <LoginButton
              isLoggedIn={props.isLoggedIn}
              toggle={props.loginToggle}
              modal="#loginModal"
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
