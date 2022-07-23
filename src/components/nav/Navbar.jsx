import React from "react";
import NavbarButton from "./NavbarButton";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import AccountOffcanvas from "./AccountOffcanvas";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar nav-main">
        <div className="container-fluid">
          <a href="https://www.fizzgen.com" className="text-decoration-none">
            <div
              className="navbar-brand text-brand-white"
              id="nav-display-name"
            >
              {props.user
                ? `fizzgen x ${props.user.attributes["custom:artistName"]}`
                : "fizzgen"}
            </div>
          </a>
          <form className="d-flex justify-content-end">
            {/* Conditionally render navbar buttons */}
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
                onClick={async () => {
                  props.setGallery(true);
                  props.setGalleryData(
                    await getGalleryData(
                      props.user.username,
                      props.user.attributes.email
                    )
                  );
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
            {props.user && (
              <button
                id="account-toggle-btn"
                type="button"
                className="btn btn-link text-decoration-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <i className="bi bi-person-circle" id="nav-account-icon"></i>
              </button>
            )}
          </form>
          {props.user && (
            <AccountOffcanvas
              user={props.user}
              galleryData={props.galleryData}
              userCredits={props.userCredits}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
