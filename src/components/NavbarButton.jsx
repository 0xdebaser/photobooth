import React from "react";

function NavbarButton(props) {
  return (
    <div>
      <li className="nav-item ms-2 mt-2">
        <button
          type="button"
          className="btn btn-outline-light"
          data-bs-toggle={props.toggle}
          data-bs-target={props.modal}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      </li>
    </div>
  );
}

export default NavbarButton;
