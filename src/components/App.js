import React, { useState, useEffect, useMemo } from "react";
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
import DemoDayModal from "./modals/DemoDayModal";

Amplify.configure(awsExports);

const dev = false;
const demo = true;

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
  //State variables for sorting gallery
  const [sortMostRecent, setSortMostRecent] = useState(true);
  const [showOwned, setShowOwned] = useState(true);
  const [showMinted, setShowMinted] = useState(true);
  const [showDemoDayMessage, setShowDemoDayMessage] = useState(true);

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
          demo={demo}
        />
        {demo && (
          <DemoDayModal
            user={user}
            setShowDemoDayMessage={setShowDemoDayMessage}
          />
        )}
        {demo &&
          showDemoDayMessage &&
          !window.localStorage.getItem("signedOut") && (
            <div className="border border-secondary mx-3 my-3 px-3 py-3">
              <div className="text-end">
                <button
                  type="button"
                  className="btn-close border border-secondary"
                  onClick={() => {
                    setShowDemoDayMessage(false);
                  }}
                ></button>
              </div>
              <p className="text-center">
                Welcome to fizzgen! For demo day only, visitors are
                automatically signed into the "sandbox" account to make features
                accessible without the need to register for a new account.
              </p>
              <p className="text-center">
                If you would like to use your own account, all you need to do is
                click the sign out button on the nav bar and log back in with
                your own account (or create a new one).
              </p>
              <div className="text-center">
                <p className="lead">Have fun! 😃</p>
                <button
                  type="button"
                  className="btn btn-primary btn-white-text"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowDemoDayMessage(false);
                  }}
                >
                  Dismiss and LFG!
                </button>
              </div>
            </div>
          )}
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
            setGalleryData={setGalleryData}
            user={user}
            setToTransfer={setToTransfer}
            setToMintMore={setToMintMore}
            sortMostRecent={sortMostRecent}
            setSortMostRecent={setSortMostRecent}
            showOwned={showOwned}
            setShowOwned={setShowOwned}
            showMinted={showMinted}
            setShowMinted={setShowMinted}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
