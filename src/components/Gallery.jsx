import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery(props) {
  return (
    <div id="gallery-main-div" className="row mt-2 ps-2 pe-2">
      {props.galleryData.map((fizz) => {
        console.log(fizz);
        return (
          <GalleryCard
            imgSrc={fizz.imgS3Url}
            title={fizz.name}
            tokenId={fizz.tokenId}
            description={fizz.description}
            network={fizz.network}
            mintTxn={fizz.mintTxn}
            owner={fizz.owner}
            contract={fizz.contract}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
