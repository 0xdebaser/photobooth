import React from "react";

function NavbarButton(props) {
  return (
    <button className="btn btn-outline-light" onClick={props.handler}>
      {props.label}
    </button>
  );
}

export default NavbarButton;
