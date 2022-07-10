import React from "react";

function GalleryCard(props) {
  return (
    <div className="col-sm-6 col-md-4 col-xl-3 mt-2">
      <div className="card border-secondary">
        <img
          src={props.imgSrc}
          className="card-img-top rounded-circle ps-3 pe-3 pt-3 pb-3"
          alt="fizzgen"
        />
        <div className="card-body">
          <h5 className="card-title">{`${props.title} No. ${props.tokenId}`}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Minted on:{" "}
            <a
              href={`https://mumbai.polygonscan.com/tx/${props.mintTxn}`}
              target="_blank"
              rel="noreferrer"
            >
              {props.network}
            </a>
          </li>
          <li className="list-group-item">Owned by {props.owner}</li>
        </ul>
        <div className="card-body">
          <a
            href={`https://testnets.opensea.io/assets/mumbai/${props.contract}/${props.tokenId}`}
            className="card-link"
            target="_blank"
            rel="noreferrer"
          >
            View NFT on OpenSea
          </a>
          {/* <a href="#" className="card-link">
            Another link
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
