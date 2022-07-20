import React, { useState } from "react";

function GalleryCard(props) {
  async function handler() {
    props.setToTransfer({
      _id: props._id,
      tokenId: props.tokenId,
      contract: props.contract,
    });
  }

  return (
    <div className="col-sm-6 col-md-4 col-xl-3 mt-2 text-center">
      <div className="card border-secondary">
        <div className="card-body" id="card-body-top">
          <img
            src={props.imgSrc}
            className="card-img-top rounded-2"
            id="card-img"
            alt="fizzgen"
          />
        </div>
        {/* Start Accordion Here */}
        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button fizzgen-card-title"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${props._id}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {`${props.title} No. ${props.tokenId}`}
              </button>
            </h2>
            <div
              id={`collapse${props._id}`}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col text-center">
                      <p className="card-text">{props.description}</p>
                    </div>
                  </div>
                </li>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col text-center">
                        Minted by: {props.minter}
                        <br />
                        {props.owner === "transferred out" && (
                          <a
                            href={`https://mumbai.polygonscan.com/tx/${props.transferTxn}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Transferred out
                          </a>
                        )}
                        {props.owner !== "transferred out" &&
                          `Owned by: ${props.owner}`}
                        {(props.owner === props.user.attributes.email ||
                          props.owner === props.user.username) && (
                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn btn-primary transfer-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#transfer-modal"
                              onClick={handler}
                            >
                              Transfer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <div className="row">
                    <div className="col text-center">
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
                    </div>
                  </div>
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
                {/* End Accordion Here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
