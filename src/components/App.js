import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./nav/Navbar";
import WebcamSuite from "./camera/WebcamSuite";
import LoginModal from "./modals/LoginModal";
import FizzgenModal from "./modals/FizzgenModal";
import getGalleryData from "../utils/GetGalleryData.mjs";
import Gallery from "./gallery/Gallery";
import TransferModal from "./modals/TransferModal";
import * as bootstrap from "bootstrap";
import { Amplify, Auth, Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const dev = false;

const GET_GALLERY_API = dev
  ? "http://localhost:8080/api/getGallery"
  : "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/getGallery";

function App() {
  // State variable used to hold logged in user info and detect whether there's a logged in user
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  // Steps are state variables used for the fizzgen creation modal
  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  // State variable to indicate whether the gallery is active
  const [gallery, setGallery] = useState(null);
  // State variable that holds data on all of a logged in user's fizzgens
  const [galleryData, setGalleryData] = useState(null);
  //State variable that holds data on fizzgen to be transferred
  const [toTransfer, setToTransfer] = useState(null);

  // From: https://www.sufle.io/blog/aws-amplify-authentication-part-2
  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      try {
        switch (event) {
          case "signIn":
            getUser().then((userData) => setUser(userData));
            //Dismiss the sign in modal
            const modalEl = document.getElementById("loginModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            setGalleryData(
              await getGalleryData(user.attributes.email, GET_GALLERY_API)
            );
            break;
          case "signOut":
            setUser(null);
            break;
          case "signIn_failure":
            console.log("Sign in failure", data);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    });

    getUser().then(async (userData) => {
      try {
        setUser(userData);
        if (user.attributes) {
          setGalleryData(
            await getGalleryData(user.attributes.email, GET_GALLERY_API)
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  // Helper function for useEffect functions
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  return (
    <div>
      <Navbar
        setGallery={setGallery}
        gallery={gallery}
        setGalleryData={setGalleryData}
        user={user}
        setUser={setUser}
        getGalleryApi={GET_GALLERY_API}
      />
      <LoginModal />
      <FizzgenModal step1={step1} step2={step2} step3={step3} />
      <TransferModal
        toTransfer={toTransfer}
        setToTransfer={setToTransfer}
        dev={dev}
        setGalleryData={setGalleryData}
        getGalleryApi={GET_GALLERY_API}
        user={user}
      />
      {!gallery && (
        <WebcamSuite
          step1={step1}
          setStep1={setStep1}
          step2={step2}
          setStep2={setStep2}
          step3={step3}
          setStep3={setStep3}
          setGallery={setGallery}
          getGalleryApi={GET_GALLERY_API}
          dev={dev}
          setGalleryData={setGalleryData}
          user={user}
        />
      )}
      {gallery && (
        <Gallery
          galleryData={galleryData}
          user={user}
          setToTransfer={setToTransfer}
        />
      )}
    </div>
  );
}

export default App;
