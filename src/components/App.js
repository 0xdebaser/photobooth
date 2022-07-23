import React, { useState, useEffect } from "react";
import Navbar from "./nav/Navbar";
import WebcamSuite from "./camera/WebcamSuite";
import LoginModal from "./modals/LoginModal";
import FizzgenModal from "./modals/FizzgenModal";
import getGalleryData from "../utils/GetGalleryData.mjs";
import Gallery from "./gallery/Gallery";
import TransferModal from "./modals/TransferModal";
import GetCreditsModal from "./modals/GetCreditsModal";
import MintMoreModal from "./modals/MintMoreModal";
import * as bootstrap from "bootstrap";
import { Amplify, Auth, Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import getCreditsData from "../utils/GetCreditsData.mjs";
import Footer from "./Footer";

Amplify.configure(awsExports);

const dev = false;

function App() {
  // State variable used to hold logged in user info and detect whether there's a logged in user
  const [user, setUser] = useState(null);
  const [userCredits, setUserCredits] = useState({});
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
  //State variable that holds data on fizzgen to mint additional copies of
  const [toMintMore, setToMintMore] = useState(null);

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
    <div id="page-container">
      <div id="content-wrap">
        <Navbar
          setGallery={setGallery}
          gallery={gallery}
          setGalleryData={setGalleryData}
          galleryData={galleryData}
          user={user}
          setUser={setUser}
          userCredits={userCredits}
        />
        <LoginModal />
        <FizzgenModal step1={step1} step2={step2} step3={step3} />
        <TransferModal
          toTransfer={toTransfer}
          setToTransfer={setToTransfer}
          dev={dev}
          setGalleryData={setGalleryData}
          user={user}
        />
        <GetCreditsModal
          userCredits={userCredits}
          setUserCredits={setUserCredits}
          user={user}
        />
        <MintMoreModal
          toMintMore={toMintMore}
          userCredits={userCredits}
          setStep1={setStep1}
          setStep2={setStep2}
          setStep3={setStep3}
          galleryData={galleryData}
          user={user}
          setGalleryData={setGalleryData}
          setGallery={setGallery}
          setUserCredits={setUserCredits}
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
            setToMintMore={setToMintMore}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
