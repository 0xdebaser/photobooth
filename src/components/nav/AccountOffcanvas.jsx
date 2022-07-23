import React from "react";
import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";

function AccountOffcanvas(props) {
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
        <hr />
        <div className="offcanvas-body text-center">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item my-2 account-data">
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
            <li className="nav-item my-2 account-data">
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
            <li className="nav-item my-2 account-data">
              <div className="d-flex flex-row">
                <div>
                  <EthLogo
                    width="36"
                    className="me-2"
                    text="testnet (goerli) mint credits:"
                  />
                </div>
                <div className="ms-2 mt-3">
                  <b>
                    {props.userCredits.hasOwnProperty("goerli") &&
                    props.userCredits.goerli
                      ? props.userCredits.goerli
                      : "0"}
                  </b>
                </div>
              </div>
            </li>
            <li className="nav-item my-2 account-data">
              <div className="d-flex flex-row">
                <div>
                  <AvaxLogo
                    className="me-2"
                    width="36"
                    text="testnet (fuji) mint credits:"
                  />
                </div>
                <div className="ms-2 mt-1">
                  <b>
                    {props.userCredits.hasOwnProperty("fuji") &&
                    props.userCredits.fuji
                      ? props.userCredits.fuji
                      : "0"}
                  </b>
                </div>
              </div>
            </li>
            <li className="nav-item my-3 account-data">
              <div className="d-flex flex-row">
                <div>
                  <PolygonLogo
                    width="36"
                    className="me-2"
                    text="testnet (mumbai) mint credits: "
                  />
                </div>
                <div className="ms-2 mt-1">
                  <b>
                    {props.userCredits.hasOwnProperty("mumbai") &&
                    props.userCredits.mumbai
                      ? props.userCredits.mumbai
                      : "0"}
                  </b>
                </div>
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
