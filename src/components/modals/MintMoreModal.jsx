import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { PolygonLogo, EthLogo, AvaxLogo } from "../../images/tokenSvgs.mjs";
import { getCreditsApi } from "../../utils/apiEndpoints.mjs";
import duplicateFizzgen from "../../utils/fizzgen_creation/DuplicateFizzgen.mjs";

function MintMoreModal(props) {
  const [targetChain, setTargetChain] = useState(null);

  //Helper function to determine wheter user has zero transfer credits
  function isEmpty(obj) {
    const empty = Object.values(obj).every((value) => {
      if (value === null || value === "0") {
        return true;
      }
      return false;
    });
    return empty;
  }

  //Helper fuction to locate gallery object with particular id
  function getGalleryObject(id) {
    console.log(id);
    for (let i = 0; i < props.galleryData.length; i++) {
      if (props.galleryData[i]["_id"] === id) {
        return props.galleryData[i];
      }
    }
    return null;
  }

  // Passes fizzgen duplication data over to controller function
  function handleSubmit(event) {
    event.preventDefault();
    console.log(targetChain);
    const originalData = getGalleryObject(props.toMintMore._id);
    if (!originalData) {
      console.alert("Problem duplicating fizzgen. Please try again.");
      return;
    }
    duplicateFizzgen(
      originalData,
      targetChain,
      props.user.username,
      props.setStep1,
      props.setStep2,
      props.setStep3
    );
  }

  return (
    <div
      className="modal fade"
      id="mint-more-modal"
      tabIndex="-1"
      aria-labelledby="mint-more-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="mintMoreModalLabel">
              mint additional copy of fizzgen no.{" "}
              {props.toMintMore && `${props.toMintMore.tokenId}`}
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
              {/* Mumbai radio button */}
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="chainSelection"
                  id="mint-mumbai-radio"
                  value="mumbai"
                  onChange={() => setTargetChain("mumbai")}
                />
                <label className="form-check-label" htmlFor="mint-mumbai-radio">
                  <div className="d-flex">
                    mint to
                    <PolygonLogo
                      className="ms-2 me-2"
                      width="36"
                      text={`(${
                        props.userCredits.mumbai
                          ? props.userCredits.mumbai
                          : "0"
                      } testnet credits remaining)`}
                    />
                  </div>
                </label>
              </div>
              {/* Avax radio button */}
              <div className="form-check my-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="chainSelection"
                  id="mint-fuji-radio"
                  value="fuji"
                  onChange={() => setTargetChain("fuji")}
                />
                <label className="form-check-label" htmlFor="mint-fuji-radio">
                  <div className="d-flex">
                    mint to
                    <AvaxLogo
                      className="ms-2 me-2"
                      width="36"
                      text={`(${
                        props.userCredits.fuji ? props.userCredits.fuji : "0"
                      } testnet credits remaining)`}
                    />
                  </div>
                </label>
              </div>
              {/* Eth radio button */}
              <div className="form-check my-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="chainSelection"
                  id="mint-goerli-radio"
                  value="goerli"
                  onChange={() => setTargetChain("goerli")}
                />
                <label className="form-check-label" htmlFor="mint-goerli-radio">
                  <div className="d-flex">
                    mint to
                    <EthLogo
                      className="ms-2 me-2"
                      width="24"
                      text={`(${
                        props.userCredits.goerli
                          ? props.userCredits.goerli
                          : "0"
                      } testnet credits remaining)`}
                    />
                  </div>
                </label>
              </div>
              <div>
                {/* Submit button will not display if user lacks credits for the selected chain.
                    In that case, get credits button will display. */}
                {props.userCredits[targetChain] &&
                props.userCredits[targetChain] !== "0" ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-white-text my-3 px-3 text-brand"
                  >
                    Mint new fizzgen!
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-white-text my-3"
                    data-bs-toggle="modal"
                    data-bs-target="#get-credits-modal"
                    onClick={(event) => event.preventDefault()}
                  >
                    Get Credits
                  </button>
                )}
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintMoreModal;
