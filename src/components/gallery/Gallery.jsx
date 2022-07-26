import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery(props) {
  let displayData;

  //Logic for filters
  if (!props.showOwned && !props.showMinted) {
    // return only items that aren't minted or owned by user -- should be []
    displayData = props.galleryData.filter(
      (obj) =>
        obj.owner !== props.user.username &&
        obj.owner !== props.user.attributes.email &&
        obj.minter !== props.user.username &&
        obj.minter !== props.user.attributes.email
    );
  } else if (!props.showOwned) {
    // only return items that were minted by user
    displayData = props.galleryData.filter(
      (obj) =>
        obj.minter === props.user.username ||
        obj.minter === props.user.attributes.email
    );
  } else if (!props.showMinted) {
    // only return items that are owned by user
    displayData = props.galleryData.filter(
      (obj) =>
        obj.owner === props.user.username ||
        obj.owner === props.user.attributes.email
    );
  } else {
    if (props.galleryData) displayData = props.galleryData.slice();
  }

  if (props.sortMostRecent) {
    displayData.reverse();
  }

  return (
    <div>
      {props.galleryData && (
        <div
          className="d-flex justify-content-between mt-2 mx-2"
          id="gallery-controls"
        >
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.sortMostRecent}
                onChange={() => {
                  props.setSortMostRecent(!props.sortMostRecent);
                }}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {props.sortMostRecent ? (
                <i className="bi bi-hourglass-top"></i>
              ) : (
                <i className="bi bi-hourglass-bottom"></i>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.showOwned}
                onChange={() => props.setShowOwned(!props.showOwned)}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {!props.showOwned && <i className="bi bi-slash-circle me-1"></i>}
              owned
            </div>
          </div>
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.showMinted}
                onChange={() => props.setShowMinted(!props.showMinted)}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {!props.showMinted && <i className="bi bi-slash-circle me-1"></i>}
              minted
            </div>
          </div>
        </div>
      )}
      <div id="gallery-main-div" className="row mt-2 ps-4">
        {/* Gallery display controls */}
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
                setToTransfer={props.setToTransfer}
                setToMintMore={props.setToMintMore}
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
    </div>
  );
}

export default Gallery;
