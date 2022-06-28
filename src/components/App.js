import React, { useState } from "react";
import Navbar from "./Navbar";
import WebcamSuite from "./WebcamSuite";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar
        isLoggedIn={loggedIn}
        loginToggle={() => setLoggedIn(!loggedIn)}
      />
      <WebcamSuite />
    </div>
  );
}

export default App;
