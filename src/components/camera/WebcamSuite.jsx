import React, { useState } from "react";
import Webcam from "react-webcam";
import CamButton from "./CamButton";
import FilterSuite from "./FilterSuite";
import * as bootstrap from "bootstrap";
import { Pixelify } from "react-pixelify";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import { addDataApi, mintApi, storeApi } from "../../utils/apiEndpoints.mjs";

function WebcamSuite(props) {
  const webcamRef = React.useRef(null);
  // State variable to hold captured (unfiltered) image
  const [imgSrc, setImgSrc] = useState(null);
  // State variable indicating which filter has been applied to webcam image
  const [appliedFilter, setAppliedFilter] = useState(null);
  // State variable to hold filtered image
  const [filteredImg, setFilteredImg] = useState(null);
  // State variable that affects level of pixelation when 8bit filter is applied
  const [pixLevel, setPixLevel] = useState(12);

  // Options/config of webcam
  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  // Captures webcam image
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 360,
      height: 360,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  // Removes all filters and resets webcam
  function reset() {
    const canvas = document.querySelector("canvas");
    if (canvas && appliedFilter !== "8bit") {
      canvas.remove();
    }
    setImgSrc(null);
    setFilteredImg(null);
    setAppliedFilter(null);
  }

  // TODO: refactor this out to a separate mdodule

  async function fizzgenMe() {
    // Resets state variables tracking fizzgen creation steps and dismisses fizzgen modal
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
      props.setStep1("started");
      props.setStep2(null);
      props.setStep3(null);
      const currentDate = new Date();
      const currentUTC = currentDate.toUTCString();

      const nftData = {
        username: props.user.username,
        name: "Fizzgen",
        description: `Fizzgen originally created by ${props.user.attributes["custom:artistName"]} at ${currentUTC}.`,
        image: filteredImg,
      };
      const body = await JSON.stringify(nftData);
      const response = await fetch(storeApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
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
          const mintData = {
            tokenUri: nftData.tokenURI,
          };
          const response2 = await fetch(mintApi, {
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
              nftData.minter = props.user.username;
              nftData.owner = props.user.username;
              nftData.minterEmail = props.user.attributes.email;
              delete nftData.image;
              //Send data to server
              const response3 = await fetch(addDataApi, {
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
                      props.user.username,
                      props.user.attributes.email
                    )
                  );
                  setTimeout(() => {
                    props.setGallery(true);
                    resetAndDismiss();
                  }, 2 * 1000);
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
          {imgSrc && !filteredImg && appliedFilter !== "8bit" && (
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
          {/* This only is active when the 8 bit filter is in use */}
          {appliedFilter === "8bit" && (
            <Pixelify src={imgSrc} pixelSize={pixLevel} />
          )}
        </div>
      </div>

      {/* Capture button appears until image is captured, then becomes reset button */}
      <div className="row mt-2">
        {!imgSrc && (
          <CamButton label="capture" handler={capture} primary={true} />
        )}
        {imgSrc && <CamButton label="reset" handler={reset} />}
      </div>

      {/* Filter drop down button appears after image is captured */}
      <div className="row mt-2">
        {imgSrc && (
          <FilterSuite
            imgSrc={imgSrc}
            appliedFilter={appliedFilter}
            setAppliedFilter={setAppliedFilter}
            filteredImg={filteredImg}
            setFilteredImg={setFilteredImg}
            pixLevel={pixLevel}
            setPixLevel={setPixLevel}
          />
        )}
      </div>

      {/* If logged in Fizzgen me button appears once filter is applied (or none is selected), otherwise login button*/}
      <div className="row mt-2" id="fizzgen-me-row">
        {filteredImg && props.user && (
          <CamButton
            label="fizzgen me!"
            primary={true}
            handler={fizzgenMe}
            modal="modal"
            target="#fizzgen-modal"
          />
        )}
        {filteredImg && !props.user && (
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
