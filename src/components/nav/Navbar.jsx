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
            {props.loggedInUser && (
              <div id="nav-display-name" className="ms-2 mt-2">
                <li>{props.loggedInUser.displayName}</li>
              </div>
            )}
            {!props.loggedInUser && (
              <NavbarButton
                label="register"
                modal="#registerModal"
                toggle="modal"
              />
            )}
            {!props.gallery && props.loggedInUser && (
              <NavbarButton
                label="gallery"
                onClick={() => {
                  props.setGallery(true);
                }}
              />
            )}
            {props.gallery && props.loggedInUser && (
              <NavbarButton
                label="camera"
                onClick={() => {
                  props.setGallery(null);
                }}
              />
            )}
            {!props.loggedInUser && (
              <LoginButton
                loggedInUser={props.loggedInUser}
                setLoggedInUser={props.setLoggedInUser}
                modal="#loginModal"
                toggle="modal"
              />
            )}
            {props.loggedInUser && (
              <NavbarButton
                label="logout"
                onClick={() => {
                  props.setLoggedInUser(null);
                  localStorage.clear();
                  props.setGallery(null);
                }}
                modal={null}
              />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
