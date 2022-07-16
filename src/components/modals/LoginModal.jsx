import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

function LoginModal() {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
