import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";
import { getCreditsApi } from "../../utils/apiEndpoints.mjs";

function GetCreditsModal(props) {
  const [loading, setLoading] = useState(false);
  // This has to be a single level object or it will break (uses shallow copy)
  const [requestedCredits, setRequestedCredits] = useState(null);

  function resetEverything() {
    setLoading(false);
    setRequestedCredits(null);
    document.getElementById("polygon-credit-input").value = "0";
    document.getElementById("avax-credit-input").value = "0";
    document.getElementById("eth-credit-input").value = "0";
  }

  async function handleSubmit(event) {
    try {
      setLoading(true);
      event.preventDefault();
      const requestData = {
        username: props.user.username,
        currentAccount: props.userCredits ? props.userCredits : null,
        requestedCredits: requestedCredits,
      };
      const response = await fetch(getCreditsApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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
          // Display success message, update credit data, and dismiss modal after slight delay
          setLoading("finished");
          console.log(data);
          const newCreditsObject = {
            polygon: data.data.polygon_credits,
            mumbai: data.data.polygon_mumbai_credits,
            eth: data.data.eth_credits,
            goerli: data.data.eth_goerli_credits,
            avax: data.data.avax_credits,
            fuji: data.data.avax_fuji_credits,
          };
          props.setUserCredits(newCreditsObject);
          setTimeout(() => {
            const modalEl = document.getElementById("get-credits-modal");
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
                    const objCopy = Object.assign({}, requestedCredits);
                    objCopy.mumbai = event.target.value;
                    setRequestedCredits(objCopy);
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
                    const objCopy = Object.assign({}, requestedCredits);
                    objCopy.fuji = event.target.value;
                    setRequestedCredits(objCopy);
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
                    const objCopy = Object.assign({}, requestedCredits);
                    objCopy.goerli = event.target.value;
                    setRequestedCredits(objCopy);
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
                  <p id="result-text">Credits added to account!</p>
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
