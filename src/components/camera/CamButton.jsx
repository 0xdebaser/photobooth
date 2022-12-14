import React from "react";

function CamButton(props) {
  return (
    <div className="text-center">
      {props.primary && (
        <button
          className={`btn btn-cam btn-secondary ${props.className}`}
          data-bs-toggle={props.modal}
          data-bs-target={props.target}
          onClick={props.handler}
        >
          {props.label}
        </button>
      )}
      {!props.primary && (
        <button className="btn btn-cam btn-primary" onClick={props.handler}>
          {props.label}
        </button>
      )}
    </div>
  );
}

export default CamButton;
