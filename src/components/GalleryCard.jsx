import React from "react";

function GalleryCard(props) {
  return (
    <div className="col-sm-6 mt-1">
      <div className="card">
        <img src={props.imgSrc} className="card-img-top" alt="fizzgen" />
        <div className="card-body">
          <h5 className="card-title">{`${props.title} No. ${props.tokenId}`}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
