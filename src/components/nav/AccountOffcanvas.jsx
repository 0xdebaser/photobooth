import React from "react";
import { useNavigate } from "react-router-dom";

import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";
import "./accountOffcanvas.styles.scss";

function AccountOffcanvas(props) {
  let navigate = useNavigate();

  if (props.user) {
    return (
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            {props.user.username}'s account
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <button
          className="btn btn-secondary transfer-btn ms-3 my-1 sign-out-btn"
          data-bs-dismiss="offcanvas"
          onClick={() => {
            props.user.signOut();
            props.setUser(null);
            navigate("/");
            return false;
          }}
        >
          sign out
        </button>
        <hr />
        <div className="offcanvas-body">
          <ul className="navbar-nav d-flex">
            <li className="nav-item my-2 account-data text-center">
              <span className="text-brand me-1">fizzgens</span> minted:{" "}
              <b>
                {props.galleryData && props.galleryData.length > 0
                  ? props.galleryData
                      .filter(
                        (fizz) =>
                          fizz.minter === props.user.username ||
                          fizz.minter === props.user.attributes.email
                      )
                      .length.toString()
                  : "0"}
              </b>
            </li>
            <li className="nav-item my-2 account-data text-center">
              <span className="text-brand me-1">fizzgens</span> owned:{" "}
              <b>
                {props.galleryData && props.galleryData.length > 0
                  ? props.galleryData
                      .filter(
                        (fizz) =>
                          fizz.owner === props.user.username ||
                          fizz.owner === props.user.attributes.email
                      )
                      .length.toString()
                  : "0"}
              </b>
            </li>
            <li className="nav-item mt-3 mb-1 account-data d-flex flex-row align-items-center justify-content-center">
              <EthLogo width="36" className="me-2" />
              <div>
                testnet (goerli) mint credits:{" "}
                <b>
                  {props.userCredits.hasOwnProperty("goerli") &&
                  props.userCredits.goerli
                    ? props.userCredits.goerli
                    : "0"}
                </b>
              </div>
            </li>
            <li className="nav-item my-3 account-data d-flex flex-row align-items-center justify-content-center">
              <AvaxLogo className="me-2" width="36" />
              <div>
                testnet (fuji) mint credits:{" "}
                <b>
                  {props.userCredits.hasOwnProperty("fuji") &&
                  props.userCredits.fuji
                    ? props.userCredits.fuji
                    : "0"}
                </b>
              </div>
            </li>
            <li className="nav-item my-3 account-data d-flex flex-row align-items-center justify-content-center">
              <PolygonLogo width="36" className="me-2" />
              <div>
                testnet (mumbai) mint credits:{" "}
                <b>
                  {props.userCredits.hasOwnProperty("mumbai") &&
                  props.userCredits.mumbai
                    ? props.userCredits.mumbai
                    : "0"}
                </b>
              </div>
            </li>
          </ul>
          <div className="text-center">
            <button
              className="btn btn-primary transfer-btn my-3"
              data-bs-toggle="modal"
              data-bs-target="#get-credits-modal"
            >
              Get more mint credits
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountOffcanvas;
