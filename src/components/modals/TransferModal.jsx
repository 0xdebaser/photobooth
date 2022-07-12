import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { ethers } from "ethers";
import getGalleryData from "../../utils/GetGalleryData.mjs";

function TransferModal(props) {
  //don't forget to delete this VVV
  const [loading, setLoading] = useState(false);
  const [internalTransfer, setInternalTransfer] = useState(true);
  const [isValid, setIsValid] = useState(false);

  function handleRadioChange(event) {
    console.log(event.target.name);
    if (event.target.name === "internalTransfer") {
      setInternalTransfer(true);
    } else setInternalTransfer(false);
    console.log(internalTransfer ? "internal" : "external");
  }

  function resetEverything() {
    setLoading(false);
    document.getElementById("transfer-input-password").value = "";
    if (document.getElementById("receive-email-address"))
      document.getElementById("receive-email-address").value = "";
    if (document.getElementById("receive-crypto-address"))
      document.getElementById("receive-crypto-address").value = "";
  }

  async function handleSubmit(event) {
    const TRANSFER_API = props.dev
      ? "http://localhost:8080/api/transfer"
      : "https://kcf8flh882.execute-api.us-east-1.amazonaws.com/dev/api/transfer";

    try {
      setLoading(true);
      event.preventDefault();
      const transferData = {
        email: props.loggedInUser.email,
        password: document.getElementById("transfer-input-password").value,
        transferType: internalTransfer ? "internal" : "external",
        recipientEmail: internalTransfer
          ? document.getElementById("receive-email-address").value
          : null,
        recipientCryptoAddress: internalTransfer
          ? null
          : document.getElementById("receive-crypto-address").value,
        contractAddress: internalTransfer ? null : props.toTransfer.contract,
        idToTransfer: props.toTransfer._id,
        tokenId: internalTransfer ? null : props.toTransfer.tokenId,
      };
      const response = await fetch(TRANSFER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transferData),
      });
      if (response.status !== 200) {
        alert(
          `There has been a server error (${response.status}). Please try again.`
        );
        resetEverything();
      } else {
        const data = await response.json();
        if (data.result !== "success") {
          alert(`${data.message} Please try again.`);
          resetEverything();
        } else {
          console.log(response);

          // Display success message, update gallery data, and dismiss modal after slight delay
          setLoading("finished");
          props.setGalleryData(
            await getGalleryData(props.loggedInUser.email, props.getGalleryApi)
          );
          setTimeout(() => {
            const modalEl = document.getElementById("transfer-modal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            resetEverything();
            modal.hide();
          }, 5 * 1000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function isValidAddress(event) {
    setIsValid(ethers.utils.isAddress(event.target.value));
  }

  return (
    <div
      className="modal fade"
      id="transfer-modal"
      tabIndex="-1"
      aria-labelledby="transferModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              transfer fizzgen no.{" "}
              {props.toTransfer ? props.toTransfer.tokenId : null}
              {/* {` ${props.toTransfer.tokenId} ? props.toTransfer.tokenId : null}`} */}
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="externalTransfer"
                  id="external-transfer-radio"
                  value="external-transfer"
                  checked={!internalTransfer}
                  onChange={handleRadioChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="external=transfer-radio"
                >
                  transfer to an external wallet address
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="internalTransfer"
                  id="internal-transfer-radio"
                  value="internal-transfer"
                  checked={internalTransfer}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  transfer to another fizzgen user's account
                </label>
              </div>
              {internalTransfer && (
                <div className="mt-3">
                  <label htmlFor="receive-email-address" className="form-label">
                    email address <b>of user receiving transfer</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="receive-email-address"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
              )}
              {!internalTransfer && (
                <div className="mt-3">
                  <label
                    htmlFor="receive-crypto-address"
                    className="form-label"
                  >
                    crypto wallet address <b>that will receive fizzgen NFT</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="receive-crypto-address"
                    required
                    onChange={isValidAddress}
                  />
                  {!isValid && (
                    <p className="mt-1">
                      💀 This is <b>not</b> a valid address!
                    </p>
                  )}
                </div>
              )}
              <div className="mt-3 mb-3">
                <label htmlFor="transfer-input-password" className="form-label">
                  <b>your</b> fizzgen account password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="transfer-input-password"
                  required
                />
              </div>
              {internalTransfer && (
                <div>
                  <p>
                    ⚠ If you transfer this fizzgen to another user, you will
                    lose control of it. Make sure that you <b>really</b> want to
                    do this. ⚠
                  </p>
                </div>
              )}
              {!internalTransfer && (
                <div>
                  <p>
                    ⚠ This NFT transfer is <b>irreversable</b>. If you send it
                    to an incorrect or invalid address, the NFT will be lost
                    forever. Make sure that you <b>really</b> want to do this. ⚠
                  </p>
                </div>
              )}
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

export default TransferModal;