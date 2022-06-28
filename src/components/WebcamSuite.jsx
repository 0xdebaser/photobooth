import React, { useState } from "react";
import Webcam from "react-webcam";
import CamButton from "./CamButton";

function WebcamSuite() {
  const [imgCapture, setImgCaptured] = useState(false);
  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <Webcam
          audio={false}
          height={360}
          width={360}
          videoConstraints={videoConstraints}
        />
      </div>
    </div>
  );
}

export default WebcamSuite;
