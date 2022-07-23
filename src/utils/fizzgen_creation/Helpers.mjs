import * as bootstrap from "bootstrap";

// Resets state variables tracking fizzgen creation steps and dismisses fizzgen modal
export function resetAndDismiss(setStep1, setStep2, setStep3) {
  setStep1(null);
  setStep2(null);
  setStep3(null);
  const modalEl = document.getElementById("fizzgen-modal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}
