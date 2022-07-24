import React from "react";
import NavbarButton from "./NavbarButton";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import AccountOffcanvas from "./AccountOffcanvas";

function Navbar(props) {
  return (
    <div>
      <nav className="nav-main py-2 px-2">
        <div className="d-flex flex-wrap align-items-center">
          <div className="me-auto ms-2">
            <a href="https://www.fizzgen.com" className="text-decoration-none">
              <div className="text-brand-white" id="nav-display-name">
                {props.user
                  ? `fizzgen x ${props.user.attributes["custom:artistName"]}`
                  : "fizzgen"}
              </div>
            </a>
          </div>
          {/* Conditionally render navbar buttons */}
          <div className="d-flex justify-content-end flex-grow-1 align-items-center">
            <div>
              {!props.user && (
                <NavbarButton
                  label="login or register"
                  toggle="modal"
                  modal="#loginModal"
                />
              )}
            </div>
            <div>
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
            </div>
            <div>
              {props.gallery && props.user && (
                <NavbarButton
                  label="camera"
                  onClick={() => {
                    props.setGallery(null);
                  }}
                />
              )}
            </div>
            <div>
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
            </div>
            <div>
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
        <div>
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
