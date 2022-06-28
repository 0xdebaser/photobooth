import React from "react";

function NavbarButton(props) {
  return (
    <div>
      <li className="nav-item ms-1 mt-2">
        <button className="btn btn-outline-light" onClick={props.handler}>
          {props.label}
        </button>
      </li>
    </div>
  );
}

export default NavbarButton;
