import React, { useState } from "react";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import * as bootstrap from "bootstrap";

function LoginModal(props) {
  // This one is for production
  const LOGIN_API = props.dev
    ? "http://localhost:8080/api/login"
    : "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/login";

  const [loading, setLoading] = useState(false);

  async function handler(event) {
    event.preventDefault();
    setLoading(true);
    const email = event.target[0].value;
    const password = event.target[1].value;
    const userData = {
      email: email,
      password: password,
    };

    //Send event data to API to create user
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status !== 200) {
        alert(
          `There has been a server error (${response.status}). Please register or try again.`
        );
      } else {
        const data = await response.json();
        if (data.result !== "success") {
          alert(`${data.message} Please try again.`);
        } else {
          props.setLoggedInUser({
            email: data.user,
            displayName: data.displayName,
          });
          localStorage.setItem("user", data.user);
          localStorage.setItem("displayName", data.displayName);
          props.setGalleryData(
            await getGalleryData(data.user, props.getGalleryApi)
          );
          const modalEl = document.getElementById("loginModal");
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();
        }
      }
    } catch (error) {
      console.error(error);
    }
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
            <form onSubmit={(event) => handler(event)}>
              <div className="mb-3">
                <label htmlFor="loginInputEmail1" className="form-label">
                  email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginInputPassword1" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginInputPassword1"
                  required
                />
              </div>
              {!loading && (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
