import React, { useState } from "react";
import { Pixelify } from "react-pixelify";
import Webcam from "react-webcam";
import CamButton from "./CamButton";
import FilterSuite from "./FilterSuite";
import CapturedImage from "./CapturedImage";

function WebcamSuite() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgCaptured, setImgCaptured] = useState(false);
  const [filter, setFilter] = useState(null);
  const [filteredImg, setFilteredImg] = useState(null);
  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 360,
      height: 360,
    });
    setImgSrc(imageSrc);
    setImgCaptured(true);
  }, [webcamRef, setImgSrc]);

  function reset() {
    setImgSrc(null);
    setImgCaptured(false);
    setFilter(null);
    setFilteredImg(null);
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.remove();
    }
  }

  function fizzgenMe() {
    console.log("Fizzgening you as we speak!");
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
          {imgSrc && !filter && (
            <img
              id="captured-img"
              className="img-captured center-block"
              src={imgSrc}
            />
          )}

          {/* Once filter is applied, this displays the filtered image */}
          <div id="canvas-container">
            <img id="to-be-replaced" src={imgSrc} hidden />
          </div>
        </div>
      </div>

      {/* Capture button appears until image is captured, then becomes reset button */}
      <div className="row mt-2">
        {!imgCaptured && (
          <CamButton label="capture" handler={capture} primary={true} />
        )}
        {imgCaptured && <CamButton label="reset" handler={reset} />}
      </div>

      {/* Filter drop down button appears after image is captured */}
      <div className="row mt-2">
        {imgCaptured && (
          <FilterSuite
            imgSrc={imgSrc}
            filter={filter}
            setFilter={setFilter}
            filteredImg={filteredImg}
            setFilteredImg={setFilteredImg}
          />
        )}
      </div>

      {/* Fizzgen me button appears once filter is applied (or none is selected) */}
      <div className="row mt-2" id="fizzgen-me-row">
        {filter && (
          <CamButton label="fizzgen me!" primary={true} handler={fizzgenMe} />
        )}
      </div>
    </div>
  );
}

export default WebcamSuite;
