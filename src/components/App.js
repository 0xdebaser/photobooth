import React, { useState } from "react";
import Navbar from "./Navbar";
import Webcam from "react-webcam";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  return (
    <div>
      <Navbar
        isLoggedIn={loggedIn}
        loginToggle={() => setLoggedIn(!loggedIn)}
      />
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
    </div>
  );
}

export default App;
