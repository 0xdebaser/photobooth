import React, { useState } from "react";
import Webcam from "react-webcam";
import CamButton from "./CamButton";
import FilterSuite from "./FilterSuite";
import getGalleryData from "../utils/GetGalleryData.mjs";
import * as bootstrap from "bootstrap";

function WebcamSuite(props) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgCaptured, setImgCaptured] = useState(false);
  const [filter, setFilter] = useState(null);
  const [filteredImg, setFilteredImg] = useState(null);

  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 360,
      height: 360,
    });
    setImgSrc(imageSrc);
    setImgCaptured(true);
  }, [webcamRef, setImgSrc]);

  function reset() {
    setImgSrc(null);
    setImgCaptured(false);
    setFilter(null);
    setFilteredImg(null);
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.remove();
    }
  }

  async function fizzgenMe() {
    function resetAndDismiss() {
      props.setStep1(null);
      props.setStep2(null);
      props.setStep3(null);
      const modalEl = document.getElementById("fizzgen-modal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    }

    try {
      //STEP 1: generate JSON data for NFT and send to generation server
      const GENERATE_API = props.dev
        ? "http://localhost:8080/api/generate"
        : "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/generate";

      props.setStep1("started");
      props.setStep2(null);
      props.setStep3(null);
      const currentDate = new Date();
      const currentUTC = currentDate.toUTCString();

      const nftData = {
        email: props.loggedInUser.email,
        name: "Fizzgen",
        description: `Fizzgen originally created by ${props.loggedInUser.displayName} at ${currentUTC}.`,
        image: filteredImg,
      };
      const storageTarget = GENERATE_API + "/store";
      const response = await fetch(storageTarget, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nftData),
      });
      if (response.status !== 200) {
        alert(
          `There has been a server error (${response.status}). Please try again.`
        );
        resetAndDismiss();
      } else {
        const data = await response.json();
        if (data.result !== "success") {
          alert(`${data.message} Please try again.`);
          resetAndDismiss();
        } else {
          props.setStep1("finished");
          nftData.tokenURI = data.ipfsUrl;
          nftData.imgS3Url = data.s3URL;

          //STEP 2: mint NFT
          props.setStep2("started");
          const mintTarget = GENERATE_API + "/mint";
          const mintData = {
            tokenUri: nftData.tokenURI,
          };
          const response2 = await fetch(mintTarget, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mintData),
          });
          if (response2.status !== 200) {
            alert(
              `There has been a server error (${response2.status}). Please try again.`
            );
            resetAndDismiss();
          } else {
            const data2 = await response2.json();
            if (data2.result !== "success") {
              alert(`${data2.message}. Please try again.`);
              resetAndDismiss();
            } else {
              props.setStep2("finished");
              // STEP 3: Add data to fizzgen mondodb
              props.setStep3("started");
              //Set data for adding to fizzgen mondodb
              nftData.contract = data2.contract;
              nftData.network = data2.network;
              nftData.tokenId = data2.tokenID;
              nftData.mintTxn = data2.txnHash;
              nftData.originalCreationDate = currentUTC;
              nftData.minter = props.loggedInUser.email;
              nftData.owner = props.loggedInUser.email;
              delete nftData.image;
              //Send data to server
              const addTarget = GENERATE_API + "/add";
              const response3 = await fetch(addTarget, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nftData),
              });
              if (response3.status !== 200) {
                alert(
                  `There has been a server error (${response3.status}). Please try again.`
                );
                resetAndDismiss();
              } else {
                const data3 = await response3.json();
                if (data3.result !== "success") {
                  alert(`${data3.message}. Please try again.`);
                  resetAndDismiss();
                } else {
                  props.setStep3("finished");
                  props.setGalleryData(
                    await getGalleryData(
                      props.loggedInUser,
                      props.getGalleryApi
                    )
                  );
                  setTimeout(() => {
                    props.setGallery(true);
                    resetAndDismiss();
                  }, 4 * 1000);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      resetAndDismiss();
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col text-center">
          {/* Display webcam until image is captured */}
          {!imgSrc && (
            <Webcam
              audio={false}
              ref={webcamRef}
              height={360}
              width={360}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.5}
            />
          )}

          {/* Once image has been captured (but before filter is applied), display captured image */}
          {imgSrc && !filter && (
            <img
              id="captured-img"
              className="img-captured center-block"
              src={imgSrc}
              alt="captured from webcam"
            />
          )}

          {/* Once filter is applied, this displays the filtered image */}
          <div id="canvas-container">
            <img
              id="to-be-replaced"
              src={imgSrc}
              alt="hidden placeholder"
              hidden
            />
          </div>
        </div>
      </div>

      {/* Capture button appears until image is captured, then becomes reset button */}
      <div className="row mt-2">
        {!imgCaptured && (
          <CamButton label="capture" handler={capture} primary={true} />
        )}
        {imgCaptured && <CamButton label="reset" handler={reset} />}
      </div>

      {/* Filter drop down button appears after image is captured */}
      <div className="row mt-2">
        {imgCaptured && (
          <FilterSuite
            imgSrc={imgSrc}
            filter={filter}
            setFilter={setFilter}
            filteredImg={filteredImg}
            setFilteredImg={setFilteredImg}
          />
        )}
      </div>

      {/* If logged in Fizzgen me button appears once filter is applied (or none is selected), otherwise login button*/}
      <div className="row mt-2" id="fizzgen-me-row">
        {filter && props.loggedInUser && (
          <CamButton
            label="fizzgen me!"
            primary={true}
            handler={fizzgenMe}
            modal="modal"
            target="#fizzgen-modal"
          />
        )}
        {filter && !props.loggedInUser && (
          <CamButton
            label="login to enable fizzgen creation"
            primary={true}
            modal="modal"
            target="#loginModal"
          />
        )}
      </div>
    </div>
  );
}

export default WebcamSuite;
