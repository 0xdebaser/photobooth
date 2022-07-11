import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery(props) {
  return (
    <div id="gallery-main-div" className="row mt-2 ps-2 pe-2">
      {props.galleryData &&
        props.galleryData.map((fizz, index) => {
          return (
            <GalleryCard
              key={index}
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
              loggedInUser={props.loggedInUser}
              setToTransfer={props.setToTransfer}
              transferTxn={fizz.transferTxnHash ? fizz.transferTxnHash : null}
            />
          );
        })}
      {!props.galleryData && (
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
