import React, { useState } from "react";

import "./gallery.styles.scss";
import GalleryCard from "../../components/gallery/GalleryCard";
import GalleryFilterControls from "../../components/gallery/GalleryFilterControls";
import filterGallery from "../../utils/gallery/FilterGallery.mjs";
import MintMoreModal from "../../components/modals/MintMoreModal";
import TransferModal from "../../components/modals/TransferModal";

function Gallery(props) {
  //State variable that holds data on fizzgen to be transferred
  const [toTransfer, setToTransfer] = useState(null);
  //State variable that holds data on fizzgen to mint additional copies of
  const [toMintMore, setToMintMore] = useState(null);
  //State variables for sorting gallery
  const [sortMostRecent, setSortMostRecent] = useState(true);
  const [showOwned, setShowOwned] = useState(true);
  const [showMinted, setShowMinted] = useState(true);

  // Filters gallery display
  const displayData = filterGallery(
    props.user,
    props.galleryData,
    showOwned,
    showMinted,
    sortMostRecent
  );

  return (
    <div>
      <GalleryFilterControls
        galleryData={props.galleryData}
        sortMostRecent={sortMostRecent}
        setSortMostRecent={setSortMostRecent}
        showOwned={showOwned}
        setShowOwned={setShowOwned}
        showMinted={showMinted}
        setShowMinted={setShowMinted}
      />

      <div id="gallery-main-div" className="row mt-2 ps-4">
        {props.galleryData &&
          Array.isArray(props.galleryData) &&
          props.galleryData.length !== 0 &&
          displayData.map((fizz, index) => {
            return (
              <GalleryCard
                key={index}
                tokenUri={fizz.tokenURI}
                imgSrc={fizz.imgS3Url}
                title={fizz.name}
                tokenId={fizz.tokenId}
                description={fizz.description}
                network={fizz.network}
                mintTxn={fizz.mintTxn}
                owner={fizz.owner}
                contract={fizz.contract}
                minter={fizz.minter}
                _id={fizz._id}
                user={props.user}
                setToTransfer={setToTransfer}
                setToMintMore={setToMintMore}
                transferTxn={fizz.transferTxnHash ? fizz.transferTxnHash : null}
              />
            );
          })}
        {(!props.galleryData ||
          !Array.isArray(props.galleryData) ||
          props.galleryData.length === 0) && (
          <div className="row mt-3">
            <div className="col text-center">
              <h1>Your gallery is empty. ¯\_(ツ)_/¯ Go make some fizzgens!</h1>
              <h5>
                Or maybe things are just loading slowly and you should be
                patient.
              </h5>
            </div>
          </div>
        )}
      </div>
      <MintMoreModal
        toMintMore={toMintMore}
        userCredits={props.userCredits}
        setUserCredits={props.setUserCredits}
        setStep1={props.setStep1}
        setStep2={props.setStep2}
        setStep3={props.setStep3}
        galleryData={props.galleryData}
        setGalleryData={props.setGalleryData}
        user={props.user}
      />
      <TransferModal
        toTransfer={toTransfer}
        setToTransfer={setToTransfer}
        dev={props.dev}
        setGalleryData={props.setGalleryData}
        user={props.user}
      />
    </div>
  );
}

export default Gallery;
