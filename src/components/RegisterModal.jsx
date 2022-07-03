import React from "react";

function RegisterModal(props) {
  function handler(event) {
    event.preventDefault();
    console.log("handler activated!");
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
              create a new fizzgen account ⚠ DOESN'T WORK YET!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
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
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterModal;
