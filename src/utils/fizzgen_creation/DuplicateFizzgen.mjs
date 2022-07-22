import React from "react";

// This function controls the fizzgen duplication process
function duplicateFizzgen(
  originalData,
  chain,
  username,
  setStep1,
  setStep2,
  setStep3
) {
  console.log("duplicateFizzgen called");
  console.log(originalData);
  console.log(chain);
  setStep1("chicken");
}

export default duplicateFizzgen;
