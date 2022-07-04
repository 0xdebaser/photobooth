import React, { useState } from "react";
import Navbar from "./Navbar";
import WebcamSuite from "./WebcamSuite";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      {!loggedInUser && (
        <LoginModal
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      )}
      {!loggedInUser && (
        <RegisterModal
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      )}
      <WebcamSuite />
    </div>
  );
}

export default App;
