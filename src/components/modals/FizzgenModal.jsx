import React from "react";

function FizzgenModal(props) {
  return (
    <div
      className="modal fade"
      id="fizzgen-modal"
      tabIndex="-1"
      aria-labelledby="fizzgen-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registereModalLabel">
              fizzgen creation is in progress!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              ⚠ closing this modal can result in your fizzgen failing to be
              created. creation can take several minutes depending on blockchain
              traffic. your fizzgen will appear in your gallery once the process
              is complete.
            </p>
            <ul>
              <li>
                step 1: storing NFT data on IPFS &ensp;
                {props.step1 === "started" && (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                )}
                {props.step1 === "finished" && "✔"}
              </li>
              <li>
                step 2: minting NFT &ensp;
                {props.step2 === "started" && (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                )}
                {props.step2 === "finished" && "✔"}
              </li>
              <li>
                step 3: adding NFT data to fizzgen database &ensp;
                {props.step3 === "started" && (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                )}
                {props.step3 === "finished" && "✔"}
              </li>
              {props.step3 === "finished" && (
                <li>your fizzgen is complete! 👍</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FizzgenModal;
