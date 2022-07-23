import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import components from "./Components.js";
import formFields from "./FormFields.js";

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
              fizzgen is more fun when you're logged in.
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="d-flex justify-content-center py-2">
            <div>
              <Authenticator
                formFields={formFields}
                components={components}
              ></Authenticator>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
