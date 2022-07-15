import React, { useState, useMemo } from "react";
import Navbar from "./nav/Navbar";
import WebcamSuite from "./camera/WebcamSuite";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import FizzgenModal from "./modals/FizzgenModal";
import getGalleryData from "../utils/GetGalleryData.mjs";
import Gallery from "./gallery/Gallery";
import TransferModal from "./modals/TransferModal";

const dev = false;

const GET_GALLERY_API = dev
  ? "http://localhost:8080/api/getGallery"
  : "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/getGallery";

function App() {
  // State variable used to hold logged in user info and detect whether there's a logged in user
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

  // Runs once upon loading to load gallery data if there is a logged in user
  useMemo(async () => {
    const user = {
      email: "jason@jason.com",
      displayName: "Jason",
    };
    setLoggedInUser(user);
    //   if (window) {
    //     const user = {
    //       email: "jason@jason.com",
    //       displayName: "Jason"
    //     }
    // if (localStorage.getItem("user")) {
    //   const email = window.localStorage.getItem("user");
    //   const displayName = window.localStorage.getItem("displayName");
    //   const user = {
    //     email: email,
    //     displayName: displayName,
    //   };
    //       setLoggedInUser(user);
    //       setGalleryData(await getGalleryData(email, GET_GALLERY_API));
    //     }
    //   }
  }, []);

  return (
    <div>
      <Navbar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setGallery={setGallery}
        gallery={gallery}
      />
      <LoginModal
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        dev={dev}
        getGalleryApi={GET_GALLERY_API}
        setGalleryData={setGallery}
      />
      {!loggedInUser && (
        <RegisterModal
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          dev={dev}
        />
      )}
      <FizzgenModal step1={step1} step2={step2} step3={step3} />
      <TransferModal
        toTransfer={toTransfer}
        setToTransfer={setToTransfer}
        loggedInUser={loggedInUser}
        dev={dev}
        setGalleryData={setGalleryData}
        getGalleryApi={GET_GALLERY_API}
      />
      {!gallery && (
        <WebcamSuite
          loggedInUser={loggedInUser}
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
        />
      )}
      {gallery && (
        <Gallery
          galleryData={galleryData}
          loggedInUser={loggedInUser}
          setToTransfer={setToTransfer}
        />
      )}
    </div>
  );
}

export default App;
