import { Link, useLocation } from "react-router-dom";

import NavbarButton from "./NavbarButton";
import getGalleryData from "../../utils/GetGalleryData.mjs";

function NavbarButtonContainer(props) {
  const path = useLocation().pathname;

  return (
    <div className="collapse navbar-collapse" id="navbarToggleButtons">
      <div className="d-flex align-items-center justify-content-end ms-auto">
        {/* Gallery button */}
        {path !== "/gallery" && props.user && (
          <Link to="/gallery">
            <NavbarButton
              label="gallery"
              onClick={async () => {
                props.setGalleryData(
                  await getGalleryData(
                    props.user.username,
                    props.user.attributes.email
                  )
                );
              }}
            />
          </Link>
        )}
        {/* Camera button */}
        {path !== "/camera" && (
          <Link to="/camera">
            <NavbarButton label="camera" />
          </Link>
        )}
        {/* Upload button */}
        {path !== "/upload" && (
          <Link to="/upload">
            <NavbarButton label="upload" />
          </Link>
        )}
        {/* Login/register button */}
        {!props.user && (
          <NavbarButton
            label="login/register"
            toggle="modal"
            modal="#loginModal"
          />
        )}
        {/* Account offcanvas toggle */}
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
  );
}

export default NavbarButtonContainer;
