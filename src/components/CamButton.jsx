import React from "react";

function CamButton(props) {
  return (
    <div className="col text-center">
      {props.primary && (
        <button className="btn btn-cam btn-secondary" onClick={props.handler}>
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
