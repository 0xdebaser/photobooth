import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";

function GetCreditsModal(props) {
  //don't forget to delete this VVV
  const [loading, setLoading] = useState(false);
  // This has to be a single level object or it will break (uses shallow copy)
  const [requestedTransfers, setRequestedTransfers] = useState({});

  async function handleSubmit(event) {}
  //     try {
  //       setLoading(true);
  //       event.preventDefault();
  //       const transferData = {
  //         email: props.user.attributes.email,
  //         transferType: internalTransfer ? "internal" : "external",
  //         recipient: internalTransfer
  //           ? document.getElementById("internal-transfer-recipient").value
  //           : null,
  //         recipientCryptoAddress: internalTransfer
  //           ? null
  //           : document.getElementById("receive-crypto-address").value,
  //         contractAddress: internalTransfer ? null : props.toTransfer.contract,
  //         idToTransfer: props.toTransfer._id,
  //         tokenId: internalTransfer ? null : props.toTransfer.tokenId,
  //       };
  //       const response = await fetch(transferApi, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(transferData),
  //       });
  //       if (response.status !== 200) {
  //         alert(
  //           `There has been a server error (${response.status}). Please try again.`
  //         );
  //         resetEverything();
  //       } else {
  //         const data = await response.json();
  //         if (data.result !== "success") {
  //           alert(`${data.message} Please try again.`);
  //           resetEverything();
  //         } else {
  //           // Display success message, update gallery data, and dismiss modal after slight delay
  //           setLoading("finished");
  //           props.setGalleryData(
  //             await getGalleryData(
  //               props.user.username,
  //               props.user.attributes.email
  //             )
  //           );
  //           setTimeout(() => {
  //             const modalEl = document.getElementById("transfer-modal");
  //             const modal = bootstrap.Modal.getInstance(modalEl);
  //             resetEverything();
  //             modal.hide();
  //           }, 2 * 1000);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       resetEverything();
  //     }
  //   }

  return (
    <div
      className="modal fade"
      id="get-credits-modal"
      tabIndex="-1"
      aria-labelledby="get-credits-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              get more mint credits
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Polgyon input */}
              <div>
                <input
                  className="my-2 me-2"
                  type="number"
                  min="0"
                  max="9"
                  name="polygonCredits"
                  id="polygon-credit-input"
                  defaultValue={0}
                  onChange={(event) => {
                    const objCopy = Object.assign({}, requestedTransfers);
                    objCopy.mumbai = event.target.value;
                    setRequestedTransfers(objCopy);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="polygon-credit-input"
                >
                  <PolygonLogo
                    className="me-2"
                    width="36"
                    text="testnet (mumbai) credits ($0.00 each)"
                  />
                </label>
              </div>
              {/* Avax Input */}
              <div>
                <input
                  className="my-2 me-2"
                  type="number"
                  min="0"
                  max="9"
                  name="avaxCredits"
                  id="avax-credit-input"
                  defaultValue={0}
                  onChange={(event) => {
                    const objCopy = Object.assign({}, requestedTransfers);
                    objCopy.fuji = event.target.value;
                    setRequestedTransfers(objCopy);
                  }}
                />
                <label className="form-check-label" htmlFor="eth-credit-input">
                  <AvaxLogo
                    className="me-2"
                    width="36"
                    text="testnet (fuji) credits ($0.00 each)"
                  />
                </label>
              </div>
              {/* Eth Input */}
              <div>
                <input
                  className="my-2 me-2"
                  type="number"
                  min="0"
                  max="9"
                  name="ethCredits"
                  id="eth-credit-input"
                  defaultValue={0}
                  onChange={(event) => {
                    const objCopy = Object.assign({}, requestedTransfers);
                    objCopy.goerli = event.target.value;
                    setRequestedTransfers(objCopy);
                  }}
                />
                <label className="form-check-label" htmlFor="eth-credit-input">
                  <EthLogo
                    className="me-2"
                    width="36"
                    text="testnet (goerli) credits ($0.00 each)"
                  />
                </label>
              </div>
              <p className="my-3 fs-3">
                Total cost: <b>$0.00</b>
              </p>
              {!loading && (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
              {loading && loading !== "finished" && (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              )}
              {loading === "finished" && (
                <div>
                  <p id="result-text">Fizzgen successfully transfered!</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetCreditsModal;
