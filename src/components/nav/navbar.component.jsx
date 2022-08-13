import React from "react";
import { Link } from "react-router-dom";

import "./navbar.styles.scss";
import NavbarButtonContainer from "./navbarButtonContainer.component";
import AccountOffcanvas from "./AccountOffcanvas";
import LoginModal from "../modals/LoginModal";
import GetCreditsModal from "../modals/GetCreditsModal";

function Navbar(props) {
  return (
    <div>
      <nav className="nav-main navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="nav-home-link" to="/">
            <span className="navbar-brand text-decoration-none text-brand-white navbar-fizzgen">
              {props.user
                ? `fizzgen x ${props.user.attributes["custom:artistName"]}`
                : "fizzgen"}
            </span>
          </Link>
          {/* Conditionally render navbar buttons */}
          {/* Toggle button for small screens */}
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
          <NavbarButtonContainer
            user={props.user}
            setGalleryData={props.setGalleryData}
          />
        </div>
      </nav>
      <div>
        {/* This is the account info that is shown when user clicks on account icon */}
        {props.user && (
          <AccountOffcanvas
            user={props.user}
            setUser={props.setUser}
            galleryData={props.galleryData}
            userCredits={props.userCredits}
          />
        )}
      </div>
      <LoginModal />
      <GetCreditsModal
        user={props.user}
        userCredits={props.userCredits}
        setUserCredits={props.setUserCredits}
      />
    </div>
  );
}
export default Navbar;
