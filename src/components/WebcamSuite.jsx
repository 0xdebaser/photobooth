import React, { useState } from "react";
import Webcam from "react-webcam";
import CamButton from "./CamButton";

function WebcamSuite() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgCaptured, setImgCaptured] = useState(false);
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
  }

  return (
    <div className="container mt-2">
      <div className="row">
        {!imgCaptured && (
          <Webcam
            audio={false}
            ref={webcamRef}
            height={360}
            width={360}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
          />
        )}
        {imgCaptured && (
          <img className="img-captured center-block" src={imgSrc} />
        )}
      </div>
      <div className="row mt-2">
        {!imgCaptured && (
          <CamButton label="capture" handler={capture} primary={true} />
        )}
        {imgCaptured && <CamButton label="reset" handler={reset} />}
      </div>
    </div>
  );
}

export default WebcamSuite;
