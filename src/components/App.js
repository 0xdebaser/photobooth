import React, { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar
        isLoggedIn={loggedIn}
        loginToggle={() => setLoggedIn(!loggedIn)}
      />
    </div>
  );
}

export default App;
