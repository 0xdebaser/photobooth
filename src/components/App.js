import React, { useState } from "react";
import Navbar from "./Navbar";
import WebcamSuite from "./WebcamSuite";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar
        isLoggedIn={loggedIn}
        loginToggle={() => setLoggedIn(!loggedIn)}
      />
      <LoginModal />
      <RegisterModal />
      <WebcamSuite />
    </div>
  );
}

export default App;
