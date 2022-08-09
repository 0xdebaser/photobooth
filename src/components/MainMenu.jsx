import React from "react";
import main_menu_header from "../images/main_menu_header.png";

function MainMenu(props) {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={main_menu_header} className="col-10 col-lg-6 mt-3"></img>
      </div>
      <h1 className="my-3 mx-3 text-center">
        You're only seconds away from making a{" "}
        <span className="text-brand">fizzgen</span>!
      </h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary btn-lg col-6 my-3 main-menu-btn"
          onClick={() => {
            props.setCamera(true);
            props.setMainMenu(false);
          }}
        >
          <i className="bi bi-camera"></i>
          <br />
          use your camera
        </button>
      </div>
      <h2 className="my-2 text-center">-or-</h2>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary btn-lg col-6 my-3 main-menu-btn"
          onClick={() => {
            props.setUpload(true);
            props.setMainMenu(false);
          }}
        >
          <i className="bi bi-upload"></i>
          <br />
          upload an image
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
