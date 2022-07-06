import React, { useState, useMemo } from "react";
import Navbar from "./Navbar";
import WebcamSuite from "./WebcamSuite";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useMemo(() => {
    if (window) {
      if (localStorage.getItem("user")) {
        const email = window.localStorage.getItem("user");
        const displayName = window.localStorage.getItem("displayName");
        const user = {
          email: email,
          displayName: displayName,
        };
        setLoggedInUser(user);
      }
    }
  }, []);

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
