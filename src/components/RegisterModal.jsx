import React, { useState } from "react";

function RegisterModal(props) {
  //This one is for production
  const REGISTER_API =
    "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/register";

  // This is one is for dev use (local host)
  // const REGISTER_API = "http://localhost:8080/api/register";

  const [loading, setLoading] = useState(false);

  async function handler(event) {
    event.preventDefault();
    setLoading(true);
    const email = event.target[0].value;
    const displayName = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;
    const joinDate = new Date().toUTCString();

    //Check to make sure passwords match
    if (password !== confirmPassword) {
      alert("Password do not match. Please correct and try again!");
      setLoading(false);
      return;
    }

    const newUserData = {
      email: email,
      displayName: displayName,
      password: password,
      joinDate: joinDate,
    };

    //Send event data to API to create user
    try {
      const response = await fetch(REGISTER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.status !== 200) {
        alert(
          `There has been a server error (${response.status}). Please try again.`
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
          document.querySelector(".modal-backdrop").remove();
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="loginModal"
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
            <form onSubmit={(event) => handler(event)}>
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
                  display name (used by app to greet you)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registerDisplayName"
                  required
                />
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
                />
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
                />
              </div>
              {!loading && (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
              {loading && (
                <div class="spinner-border text-primary" role="status"></div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterModal;
