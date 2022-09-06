import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Page from "../routes/page/page.component";
import Camera from "../routes/camera/camera.component";

import * as bootstrap from "bootstrap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Camera />} />
      </Route>
    </Routes>
  );
}

export default App;
