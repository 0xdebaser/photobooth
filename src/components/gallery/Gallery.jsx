import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery(props) {
  let reversedGalleryData;

  if (props.galleryData) {
    reversedGalleryData = props.galleryData.slice().reverse();
  }

  return (
    <div id="gallery-main-div" className="row mt-2 ps-2 pe-2">
      {props.galleryData &&
        props.galleryData.length !== 0 &&
        reversedGalleryData.map((fizz, index) => {
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
      {(!props.galleryData || props.galleryData.length === 0) && (
        <div className="row mt-3">
          <div className="col text-center">
            <h1>Your gallery is empty. ¯\_(ツ)_/¯ Go make some fizzgens!</h1>
            <h5>
              Or maybe things are just loading slowly and you should be patient.
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
