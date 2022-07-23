import React from "react";

function NavbarButton(props) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-light ms-2 mt-2 nav-btn"
        data-bs-toggle={props.toggle}
        data-bs-target={props.modal}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export default NavbarButton;
