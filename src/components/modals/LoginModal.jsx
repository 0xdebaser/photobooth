import React, { useState } from "react";
import getGalleryData from "../../utils/GetGalleryData.mjs";

import { Authenticator } from "@aws-amplify/ui-react";

function LoginModal(props) {
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              fizzgen is more fun when you're logged in
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <Authenticator></Authenticator>
            </div>

            {/* <form id="login-form" onSubmit={(event) => handler(event)}>
              <div className="mb-3">
                <label htmlFor="login-username" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="login-username"
                  aria-describedby="loginUsername"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  required
                />
              </div>
              {!loading && loginSuccess !== 0 && (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
              {loading && (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              )}
            </form>
            {loginSuccess === 0 && (
              <div>
                <p>You were successfully logged in.</p>
              </div>
            )}
            {loginSuccess === 1 && (
              <div>
                <p>Login failed. Please try again.</p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
