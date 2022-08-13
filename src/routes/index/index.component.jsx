import { Link } from "react-router-dom";

import "./index.styles.scss";
import main_menu_header from "../../images/main_menu_header.png";

function Index() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <img
          src={main_menu_header}
          className="col-10 col-lg-6 mt-3"
          alt="fizzgen collage"
        ></img>
      </div>
      <h1 className="my-3 mx-3 text-center">
        You're only seconds away from making a{" "}
        <span className="text-brand">fizzgen</span>!
      </h1>
      <div className="d-flex justify-content-center">
        <Link className="index-link" to="camera">
          <button className="btn btn-secondary btn-lg col-6 my-3 index-btn">
            <i className="bi bi-camera"></i>
            <br />
            use your camera
          </button>
        </Link>
      </div>
      <h2 className="my-2 text-center">-or-</h2>
      <div className="d-flex justify-content-center">
        <Link className="index-link" to="upload">
          <button className="btn btn-secondary btn-lg col-6 my-3 index-btn">
            <i className="bi bi-upload"></i>
            <br />
            upload an image
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
