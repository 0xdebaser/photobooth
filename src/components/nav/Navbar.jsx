import React from "react";
import NavbarButton from "./NavbarButton";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import AccountOffcanvas from "./AccountOffcanvas";

function Navbar(props) {
  return (
    <div>
      <nav className="nav-main navbar navbar-expand-lg">
        <div className="container-fluid">
          <a
            href="https://www.fizzgen.com"
            className="navbar-brand text-decoration-none text-brand-white"
          >
            {props.user
              ? `fizzgen x ${props.user.attributes["custom:artistName"]}`
              : "fizzgen"}
          </a>
          {/* Conditionally render navbar buttons */}
          <button
            className="navbar-toggler btn-white-text border"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleButtons"
            aria-controls="navbarToggleButtons"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggleButtons">
            <div className="d-flex align-items-center justify-content-end ms-auto">
              {!props.gallery && props.user && (
                <NavbarButton
                  label="gallery"
                  onClick={async () => {
                    props.setGallery(true);
                    props.setMainMenu(false);
                    props.setUpload(false);
                    props.setCamera(false);
                    props.setGalleryData(
                      await getGalleryData(
                        props.user.username,
                        props.user.attributes.email
                      )
                    );
                  }}
                />
              )}
              {!props.camera && !props.mainMenu && (
                <NavbarButton
                  label="camera"
                  onClick={() => {
                    props.setCamera(true);
                    props.setGallery(false);
                    props.setMainMenu(false);
                    props.setUpload(false);
                  }}
                />
              )}
              {!props.upload && !props.mainMenu && (
                <NavbarButton
                  label="upload"
                  onClick={() => {
                    props.setUpload(true);
                    props.setGallery(false);
                    props.setMainMenu(false);
                    props.setCamera(false);
                  }}
                />
              )}
              {props.user && (
                <NavbarButton
                  label="sign&nbsp;out"
                  onClick={() => {
                    props.user.signOut();
                    props.setUser(null);
                    window.location.reload();
                    return false;
                  }}
                  modal={null}
                />
              )}
              {!props.user && (
                <NavbarButton
                  label="login/register"
                  toggle="modal"
                  modal="#loginModal"
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
            </div>
          </div>
        </div>
      </nav>
      <div>
        {props.user && (
          <AccountOffcanvas
            user={props.user}
            galleryData={props.galleryData}
            userCredits={props.userCredits}
          />
        )}
      </div>
    </div>
  );
}
export default Navbar;
