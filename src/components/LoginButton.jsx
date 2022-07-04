import React from "react";

function LoginButton(props) {
  return (
    <div>
      <li className="nav-item ms-1 mt-2">
        <button
          type="button"
          className="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target={props.modal}
        >
          {props.loggedInUser ? "logout" : "login"}
        </button>
      </li>
    </div>
  );
}

export default LoginButton;
