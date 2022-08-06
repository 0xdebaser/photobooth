import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { ethers } from "ethers";
import getGalleryData from "../../utils/GetGalleryData.mjs";
import { transferApi } from "../../utils/apiEndpoints.mjs";

function TransferModal(props) {
  //don't forget to delete this VVV
  const [loading, setLoading] = useState(false);
  const [internalTransfer, setInternalTransfer] = useState(true);
  const [isValid, setIsValid] = useState(false);

  function handleRadioChange(event) {
    // console.log(event.target.name);
    if (event.target.name === "internalTransfer") {
      setInternalTransfer(true);
    } else setInternalTransfer(false);
    // console.log(internalTransfer ? "internal" : "external");
  }

  function resetEverything() {
    setLoading(false);
    if (document.getElementById("receive-email-address"))
      document.getElementById("receive-email-address").value = "";
    if (document.getElementById("receive-crypto-address"))
      document.getElementById("receive-crypto-address").value = "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let chain;
    try {
      switch (props.toTransfer.network) {
        case "Polygon Mumbai":
          chain = "mumbai";
          break;

        case "Ethereum Goerli":
          chain = "goerli";
          break;

        case "Avalanche Fuji":
          chain = "fuji";
          break;

        default:
          console.log(props.toTransfer.network);
          throw new Error("No chain specified for transfer!");
      }
      setLoading(true);
      const transferData = {
        email: props.user.attributes.email,
        transferType: internalTransfer ? "internal" : "external",
        recipient: internalTransfer
          ? document.getElementById("internal-transfer-recipient").value
          : null,
        recipientCryptoAddress: internalTransfer
          ? null
          : document.getElementById("receive-crypto-address").value,
        contractAddress: internalTransfer ? null : props.toTransfer.contract,
        idToTransfer: props.toTransfer._id,
        tokenId: internalTransfer ? null : props.toTransfer.tokenId,
        chain: chain,
      };
      const response = await fetch(transferApi, {
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
          // Display success message, update gallery data, and dismiss modal after slight delay
          setLoading("finished");
          props.setGalleryData(
            await getGalleryData(
              props.user.username,
              props.user.attributes.email
            )
          );
          setTimeout(() => {
            const modalEl = document.getElementById("transfer-modal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            resetEverything();
            modal.hide();
          }, 2 * 1000);
        }
      }
    } catch (error) {
      console.error(error);
      resetEverything();
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
                  <label
                    htmlFor="internal-transfer-recipient"
                    className="form-label"
                  >
                    email address or username <b>of user receiving transfer</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="internal-transfer-recipient"
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
              <div className="mt-3">
                {internalTransfer && (
                  <div>
                    <p>
                      <span className="emoji">⚠</span> If you transfer this
                      fizzgen to another user, you will lose control of it. Make
                      sure that you <b>really</b> want to do this.{" "}
                      <span className="emoji">⚠</span>
                    </p>
                  </div>
                )}
                {!internalTransfer && (
                  <div>
                    <p>
                      <span className="emoji">⚠</span> This NFT transfer is{" "}
                      <b>irreversable</b>. If you send it to an incorrect or
                      invalid address, the NFT will be lost forever. Make sure
                      that you <b>really</b> want to do this.
                      <span className="emoji">⚠</span>
                    </p>
                  </div>
                )}
              </div>
              {!loading && (
                <button
                  type="submit"
                  className="btn btn-primary btn-white-text"
                >
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
