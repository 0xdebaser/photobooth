import React, { useMemo } from "react";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "../../aws-exports.js";
import * as bootstrap from "bootstrap";

function DemoDayModal(props) {
  useMemo(async () => {
    if (props.user) {
      console.log(
        `${props.user.username} is logged in. Not logging into sandbox account.`
      );
      props.setShowDemoDayMessage(false);
      return;
    } else if (!window.localStorage.getItem("signedOut")) {
      console.log("Logging in to sandbox account...");
      Amplify.configure(awsExports);
      try {
        await Auth.signIn("sandbox", "Sandbox1!");
      } catch (error) {
        // console.log("error signing in", error);
      }
    } else {
      console.log("Prior signout is blocking sandbox sign in.");
      props.setShowDemoDayMessage(false);
    }
  }, []);

  return;
  // (
  //   <div
  //     className="modal fade"
  //     id="demoDayModal"
  //     tabIndex="-1"
  //     aria-labelledby="demoDayModal"
  //     aria-hidden="true"
  //   >
  //     <div className="modal-dialog">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h5 className="modal-title" id="loginModalLabel">
  //             Welcome to fizzgen's demo day!
  //           </h5>
  //           <button
  //             type="button"
  //             className="btn-close"
  //             //data-bs-dismiss="modal"
  //             aria-label="Close"
  //             onClick={() => {
  //               console.log("Click!");
  //               props.demoDayModal.hide();
  //               // const demoDayModalEl = document.getElementById("demoDayModal");
  //               // if (demoDayModalEl) {
  //               //   const demoDayModal = new bootstrap.Modal(demoDayModalEl);
  //               //   console.log(demoDayModal);
  //               //   demoDayModal.hide();
  //               // }
  //               // const el = document.querySelector(".modal-backdrop");
  //               // el.remove();
  //               // const bodyEl = document.querySelector("body");
  //               // console.log(bodyEl.classList);
  //               // bodyEl.classList.remove("modal-open");
  //               // console.log(bodyEl.classList);
  //             }}
  //           ></button>
  //         </div>
  //         <div className="d-flex justify-content-center py-2">
  //           <div className="mx-3">
  //             <p>
  //               I am very happy to have you visit fizzgen! For demo day only,
  //               visitors to the fizzgen app are automatically signed into the
  //               "sandbox" account so that fizzgen's features can be tested
  //               without the need to register for a new account. Plus, it will be
  //               fun for all the demo day photos to show up on one account.
  //             </p>
  //             <p>
  //               If you would like to use your own account, all you need to do is
  //               click the logout button on the nav bar and log back in with your
  //               own account (or create a new one).
  //             </p>
  //             <p className="lead">Have fun! 😃</p>
  //           </div>
  //         </div>
  //         <div className="d-flex justify-content-center mb-3">
  //           <button
  //             type="button"
  //             className="btn btn-primary btn-white-text"
  //             data-bs-dismiss="modal"
  //             aria-label="Close"
  //             onClick={() => {
  //               // const modalEl = document.getElementById("demoDayModal");
  //               // const modal = bootstrap.Modal.getInstance(modalEl);
  //               // modal.hide();
  //             }}
  //           >
  //             LFG!
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default DemoDayModal;
