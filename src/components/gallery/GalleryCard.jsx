import React from "react";
import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";

let chain;
let txnUrl;

function GalleryCard(props) {
  async function transferHandler(targetChain) {
    props.setToTransfer({
      _id: props._id,
      tokenId: props.tokenId,
      contract: props.contract,
      network: props.network,
    });
  }

  async function mintMoreHandler() {
    props.setToMintMore({
      tokenId: props.tokenId,
      tokenUri: props.tokenUri,
      _id: props._id,
    });
  }

  // Renamed to make checking the variable a little more convenient, and a
  switch (props.network) {
    case "Polygon Mumbai":
      chain = "mumbai";
      txnUrl = `https://mumbai.polygonscan.com/tx/`;
      break;
    case "Polygon":
      chain = "polygon";
      break;
    case "Avalanche Fuji":
      chain = "fuji";
      txnUrl = "https://testnet.snowtrace.io/tx/";
      break;
    case "Avalanche":
      chain = "avax";
      break;
    case "Ethereum Goerli":
      chain = "goerli";
      txnUrl = "https://goerli.etherscan.io/tx/";
      break;
    case "Ethereum":
      chain = "eth";
      break;
    default:
      chain = null;
      break;
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
                className="accordion-button collapsed fizzgen-card-title"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${props._id}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="d-flex">
                  <div>{`${props.title} No. ${props.tokenId} on`}</div>
                  <div>
                    {(chain === "mumbai" || chain === "polygon") && (
                      <PolygonLogo width="24" className="ms-2" />
                    )}
                    {(chain === "goerli" || chain === "eth") && (
                      <EthLogo width="15" className="ms-2" />
                    )}
                    {(chain === "fuji" || chain === "avax") && (
                      <AvaxLogo width="24" className="ms-2" />
                    )}
                  </div>
                </div>
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
                            href={txnUrl + props.transferTxn}
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
                              onClick={() => transferHandler(chain)}
                            >
                              Transfer
                            </button>
                          </div>
                        )}
                        {(props.owner === props.user.attributes.email ||
                          props.owner === props.user.username) && (
                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn btn-primary transfer-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#mint-more-modal"
                              onClick={mintMoreHandler}
                            >
                              Mint Again
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
                          href={txnUrl + props.mintTxn}
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
                  {(chain === "eth" ||
                    chain === "goerli" ||
                    chain === "mumbai" ||
                    chain === "polygon") && (
                    <a
                      href={`https://testnets.opensea.io/assets/mumbai/${props.contract}/${props.tokenId}`}
                      className="card-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View NFT on OpenSea
                    </a>
                  )}
                  {(chain === "avax" || chain === "fuji") && (
                    <a
                      href={`https://testnets.nftrade.com/assets/fuji/${props.contract}/${props.tokenId}`}
                      className="card-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View NFT on NFTrade
                    </a>
                  )}
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
