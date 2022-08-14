import React, { useState } from "react";
import Webcam from "react-webcam";
import CamButton from "../../components/camera/CamButton";
import FilterSuite from "../../components/camera/FilterSuite";
import { Pixelify } from "react-pixelify";
import { useNavigate } from "react-router-dom";

import fizzgenMe from "../../utils/fizzgen_creation/FizzgenMe.mjs";
import "./camera.styles.scss";

function Camera(props) {
  const webcamRef = React.useRef(null);
  // State variable to hold captured (unfiltered) image
  const [imgSrc, setImgSrc] = useState(null);
  // State variable indicating which filter has been applied to webcam image
  const [appliedFilter, setAppliedFilter] = useState(null);
  // State variable to hold filtered image
  const [filteredImg, setFilteredImg] = useState(null);
  // State variable that affects level of pixelation when 8bit filter is applied
  const [pixLevel, setPixLevel] = useState(12);
  // State variable that allows for flipping of camera on cell phones
  const [cameraFacing, setCameraFacing] = useState("user");

  let navigate = useNavigate();

  // Options/config of webcam
  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: cameraFacing,
  };

  // Captures webcam image
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 360,
      height: 360,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  // Removes all filters and resets webcam
  function reset() {
    const canvas = document.querySelector("canvas");
    if (canvas && appliedFilter !== "8bit") {
      canvas.remove();
    }
    setImgSrc(null);
    setFilteredImg(null);
    setAppliedFilter(null);
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col text-center">
          {/* Display webcam until image is captured */}
          {!imgSrc && (
            <Webcam
              audio={false}
              ref={webcamRef}
              height={360}
              width={360}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.5}
            />
          )}

          {/* Once image has been captured (but before filter is applied), display captured image */}
          {imgSrc && !filteredImg && appliedFilter !== "8bit" && (
            <img
              id="captured-img"
              className="img-captured center-block"
              src={imgSrc}
              alt="captured from webcam"
            />
          )}
          {/* Once filter is applied, this displays the filtered image */}
          <div id="canvas-container">
            <img
              id="to-be-replaced"
              src={imgSrc}
              alt="hidden placeholder"
              hidden
            />
          </div>
          {/* This only is active when the 8 bit filter is in use */}
          {appliedFilter === "8bit" && (
            <Pixelify src={imgSrc} pixelSize={pixLevel} />
          )}
        </div>
      </div>

      {/* Capture button appears until image is captured, then becomes reset button */}
      <div className="d-flex flex-row align-items-center justify-content-center mt-2">
        {!imgSrc && (
          <CamButton label="capture" handler={capture} primary={true} />
        )}
        {!imgSrc && window.screen.width <= 1024 && (
          <div>
            <button
              className="btn btn-cam btn-secondary ms-2"
              onClick={() => {
                cameraFacing === "user"
                  ? setCameraFacing({ exact: "environment" })
                  : setCameraFacing("user");
              }}
            >
              <i className="bi bi-arrow-repeat"></i>
              <i className="bi bi-camera ms-2"></i>
            </button>
          </div>
        )}
        {imgSrc && <CamButton label="reset" handler={reset} />}
      </div>

      {/* Filter drop down button appears after image is captured */}
      <div className="row mt-2">
        {imgSrc && (
          <FilterSuite
            imgSrc={imgSrc}
            appliedFilter={appliedFilter}
            setAppliedFilter={setAppliedFilter}
            filteredImg={filteredImg}
            setFilteredImg={setFilteredImg}
            pixLevel={pixLevel}
            setPixLevel={setPixLevel}
          />
        )}
      </div>

      {/* If logged in Fizzgen me button appears once filter is applied (or none is selected), otherwise login button*/}
      <div className="row mt-2" id="fizzgen-me-row">
        {filteredImg && props.user && (
          <CamButton
            label="fizzgen me!"
            primary={true}
            handler={async () => {
              await fizzgenMe(
                props.user,
                filteredImg,
                props.setStep1,
                props.setStep2,
                props.setStep3,
                props.setGalleryData
              );
              navigate("/gallery");
            }}
            modal="modal"
            target="#fizzgen-modal"
          />
        )}
        {filteredImg && !props.user && (
          <CamButton
            label="login to enable fizzgen creation"
            primary={true}
            modal="modal"
            target="#loginModal"
          />
        )}
      </div>
    </div>
  );
}

export default Camera;
