import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Page from "../routes/page/page.component";
import Index from "../routes/index/index.component";
import Upload from "../routes/upload/upload.component";
import Camera from "../routes/camera/camera.component";
import Gallery from "../routes/gallery/gallery.component";
import getGalleryData from "../utils/GetGalleryData.mjs";

import * as bootstrap from "bootstrap";
import { Amplify, Auth, Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import getCreditsData from "../utils/GetCreditsData.mjs";

Amplify.configure(awsExports);

// Used to switch over to dev server API
const dev = false;

function App() {
  // State variable used to hold logged in user info and detect whether there's a logged in user
  const [user, setUser] = useState(null);
  // State variable that holds credits info for logged in user
  const [userCredits, setUserCredits] = useState({});
  // Steps are state variables used for the fizzgen creation modal
  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  // State variable that holds data on all of a logged in user's fizzgens
  const [galleryData, setGalleryData] = useState(null);

  // From: https://www.sufle.io/blog/aws-amplify-authentication-part-2

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      try {
        switch (event) {
          case "signIn":
            await getUser().then(async (userData) => {
              setUser(userData);
              //Dismiss the sign in modal
              const modalEl = document.getElementById("loginModal");
              const modal = bootstrap.Modal.getInstance(modalEl);
              modal.hide();
              if (userData.attributes) {
                setGalleryData(
                  await getGalleryData(
                    userData.username,
                    userData.attributes.email
                  )
                );
                setUserCredits(await getCreditsData(userData.username));
              }
            });
            break;
          case "signOut":
            setUser(null);
            break;
          case "signIn_failure":
            console.log("Sign in failure", data);
            break;
          default:
            break;
        }
      } catch (error) {}
    });

    getUser().then(async (userData) => {
      try {
        setUser(userData);
        if (userData.attributes) {
          setGalleryData(
            await getGalleryData(userData.username, userData.attributes.email)
          );
          setUserCredits(await getCreditsData(userData.username));
        }
      } catch (error) {}
    });
  }, []);

  // Helper function for useEffect functions
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => {});
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Page
            user={user}
            setUser={setUser}
            galleryData={galleryData}
            setGalleryData={setGalleryData}
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            step1={step1}
            step2={step2}
            step3={step3}
          />
        }
      >
        <Route index element={<Index />} />
        <Route path="upload" element={<Upload />} />
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
