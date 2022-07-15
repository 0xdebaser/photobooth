import React, { useState } from "react";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import * as bootstrap from "bootstrap";
import { Config } from "aws-sdk";
import {
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

function LoginModal(props) {
  // State variable used to toggle loading spinner
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

  async function handler(event) {
    event.preventDefault();
    setLoading(true);
    setLoginSuccess(null);

    //Set variables based on input values
    const username = event.target[0].value;
    const password = event.target[1].value;

    // AWS/Cognito Config
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      ClientId: process.env.REACT_APP_CLIENT_ID,
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setLoginSuccess(0);
        props.setLoggedInUser(result.user);
        document.getElementById("login-form").reset();
      },

      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
        setLoginSuccess(1);
      },
    });

    // //Send event data to API to create user
    // try {
    //   const response = await fetch(LOGIN_API, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   });

    //   if (response.status !== 200) {
    //     alert(
    //       `There has been a server error (${response.status}). Please register or try again.`
    //     );
    //   } else {
    //     const data = await response.json();
    //     if (data.result !== "success") {
    //       alert(`${data.message} Please try again.`);
    //     } else {
    //       props.setLoggedInUser({
    //         email: data.user,
    //         displayName: data.displayName,
    //       });
    //       localStorage.setItem("user", data.user);
    //       localStorage.setItem("displayName", data.displayName);
    //       props.setGalleryData(
    //         await getGalleryData(data.user, props.getGalleryApi)
    //       );
    //       const modalEl = document.getElementById("loginModal");
    //       const modal = bootstrap.Modal.getInstance(modalEl);
    //       modal.hide();
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    setLoading(false);
    // TODO: clear input fields;
  }

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
              login to fizzgen
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="login-form" onSubmit={(event) => handler(event)}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
