import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Page from "../routes/page/page.component";
import Index from "../routes/index/index.component";
import Camera from "../routes/camera/camera.component";

import * as bootstrap from "bootstrap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Index />} />
        <Route
          path="upload"
          element={
            <Upload
              user={user}
              setStep1={setStep1}
              setStep2={setStep2}
              setStep3={setStep3}
              setGalleryData={setGalleryData}
            />
          }
        />
        <Route
          path="camera"
          element={
            <Camera
              step1={step1}
              setStep1={setStep1}
              step2={step2}
              setStep2={setStep2}
              step3={step3}
              setStep3={setStep3}
              dev={dev}
              setGalleryData={setGalleryData}
              user={user}
            />
          }
        />
        <Route
          path="gallery"
          element={
            <Gallery
              galleryData={galleryData}
              setGalleryData={setGalleryData}
              user={user}
              userCredits={userCredits}
              setUserCredits={setUserCredits}
              setStep1={setStep1}
              setStep2={setStep2}
              setStep3={setStep3}
              dev={dev}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
