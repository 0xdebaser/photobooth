import React from "react";
import NavbarButton from "./NavbarButton";
import { Auth } from "aws-amplify";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm" id="nav-main">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fs-2">
            <span className="text-brand">fizzgen </span>
            <span id="text-artist">
              {props.user && `by ${props.user.username}`}
            </span>
          </span>
          <ul className="navbar-nav">
            {!props.user && (
              <NavbarButton
                label="login or register"
                toggle="modal"
                modal="#loginModal"
              />
            )}
            {!props.gallery && props.user && (
              <NavbarButton
                label="gallery"
                onClick={() => {
                  props.setGallery(true);
                }}
              />
            )}
            {props.gallery && props.user && (
              <NavbarButton
                label="camera"
                onClick={() => {
                  props.setGallery(null);
                }}
              />
            )}
            {props.user && (
              <NavbarButton
                label="sign out"
                onClick={() => {
                  props.user.signOut();
                  props.setUser(null);
                  window.location.reload();
                  return false;
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
