import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery(props) {
  return (
    <div id="gallery-main-div" className="row">
      {props.galleryData.map((fizz) => {
        console.log(fizz);
        return (
          <GalleryCard
            imgSrc={fizz.imgS3Url}
            title={fizz.name}
            tokenId={fizz.tokenId}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
