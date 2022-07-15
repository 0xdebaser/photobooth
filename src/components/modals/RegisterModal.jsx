import React, { useState } from "react";
import { Config } from "aws-sdk";
import {
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUser,
} from "amazon-cognito-identity-js";
import * as bootstrap from "bootstrap";

function RegisterModal(props) {
  // State variable used to toggle loading spinner
  const [loading, setLoading] = useState(false);
  // State variable used to indicate whether password meets strength requirements
  const [isStrongPassword, setIsStrongPassword] = useState(null);
  // State variable used to indicate whether password and confirm password match
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Makes sure that password conforms to rules: at least 8 chars, 1 upper, 1 lower, 1 digit, one special
  function testPassword(event) {
    const password = event.target.value;
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    const validPassword = regExp.test(password);
    setIsStrongPassword(validPassword);
  }

  // Makes sure that password and confirm password match
  function checkPasswordsMatch(event) {
    const confirmPassword = event.target.value;
    const password = document.getElementById("registerInputPassword1").value;
    setPasswordsMatch(confirmPassword === password);
  }

  async function handler(event) {
    event.preventDefault();
    setLoading(true);

    // Cognito configuration
    Config.region = process.env.REACT_APP_AWS_REGION;
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      ClientId: process.env.REACT_APP_CLIENT_ID,
    });

    // Read inputs into variables
    const username = event.target[0].value;
    const email = event.target[1].value;
    const displayName = event.target[2].value;
    const password = event.target[3].value;
    const confirmPassword = event.target[4].value;

    // Check to make sure passwords match
    if (password !== confirmPassword) {
      alert("Password do not match. Please correct and try again!");
      setLoading(false);
      return;
    }

    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: "custom:displayName",
        Value: displayName,
      }),
    ];

    // Register user via Cognito sdk
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      props.setLoggedInUser(result.user);
      console.log(`Username is ${props.loggedInUser.getUsername()}`);
      console.log(props.loggedInUser);
    });
    setLoading(false);
    if (props.loggedInUser) {
      setTimeout(() => {
        document.getElementById("register-form").reset();
        const modalEl = document.getElementById("register-modal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }, 2 * 1000);
    }
  }

  return (
    <div
      className="modal fade"
      id="register-modal"
      tabIndex="-1"
      aria-labelledby="registerModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registereModalLabel">
              create a new fizzgen account
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="register-form" onSubmit={(event) => handler(event)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="register-input-username"
                  aria-describedby="inputUsername"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginInputEmail1" className="form-label">
                  email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
                <div id="emailHelp" className="form-text">
                  we'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="displayName" className="form-label">
                  display name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registerDisplayName"
                  required
                />
                <div id="displayNameHelp" className="form-text">
                  used by the app to greet you and listed as the fizzgen creator
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="registerInputPassword1" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerInputPassword1"
                  required
                  onChange={testPassword}
                />
                <div id="passwordHelp" className="form-text">
                  {isStrongPassword
                    ? "✔"
                    : "❌ Must contain at least 8 characters, 1 upper, 1 lower, 1 digit, and one special"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="registerInputPassword2" className="form-label">
                  confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerInputPassword2"
                  required
                  onChange={checkPasswordsMatch}
                />
                <div id="passwordConfirmHelp" className="form-text">
                  {passwordsMatch ? "✔" : "❌ Passwords do not match"}
                </div>
              </div>
              {!loading && !props.loggedInUser && (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
              {!loading && props.loggedInUser && (
                <p>Successfully registered new user.</p>
              )}
              {loading && (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
