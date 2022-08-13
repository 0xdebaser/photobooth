import { resetAndDismiss } from "./Helpers.mjs";
import { mintApi, addDataApi, getCreditsApi } from "../apiEndpoints.mjs";
import getGalleryData from "../GetGalleryData.mjs";

// This function controls the fizzgen duplication process
async function duplicateFizzgen(
  originalData,
  chain,
  user,
  setStep1,
  setStep2,
  setStep3,
  setGalleryData,
  userCredits,
  setUserCredits
) {
  try {
    //Skipping step 1 because it is resusing metadata from source fizzgen
    setStep1("finished");
    setStep2(null);
    setStep3(null);
    //STEP 2: mint NFT
    setStep2("started");
    const mintData = {
      tokenUri: originalData.tokenURI,
      chain: chain,
    };
    const response = await fetch(mintApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mintData),
    });
    if (response.status !== 200) {
      alert(
        `There has been a server error (${response.status}). Please try again.`
      );
      resetAndDismiss(setStep1, setStep2, setStep3);
      return;
    }
    const data = await response.json();
    if (data.result !== "success") {
      alert(`${data.message}. Please try again.`);
      resetAndDismiss(setStep1, setStep2, setStep3);
      return;
    }
    setStep2("finished");
    // STEP 3: Add data to fizzgen mondodb
    setStep3("started");
    //Set data for adding to fizzgen mondodb
    const currentDate = new Date();
    const currentUTC = currentDate.toUTCString();
    const nftData = {
      username: user.username,
      name: originalData.name,
      tokenURI: originalData.tokenURI,
      imgS3Url: originalData.imgS3Url,
      description: originalData.description,
      contract: data.contract,
      network: data.network,
      tokenId: data.tokenID,
      mintTxn: data.txnHash,
      originalCreationDate: currentUTC,
      minter: user.username,
      owner: user.username,
      minterEmail: user.attributes.email,
    };
    // Send data to server
    const response2 = await fetch(addDataApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nftData),
    });
    if (response2.status !== 200) {
      alert(
        `There has been a server error (${response2.status}). Please try again.`
      );
      resetAndDismiss(setStep1, setStep2, setStep3);
      return;
    }
    const data2 = await response2.json();
    if (data2.result !== "success") {
      alert(`${data2.message}. Please try again.`);
      resetAndDismiss(setStep1, setStep2, setStep3);
      return;
    }
    setGalleryData(await getGalleryData(user.username, user.attributes.email));
    setStep3("finished");
    setTimeout(() => {
      resetAndDismiss(setStep1, setStep2, setStep3);
      // Need to come up with a more elegant (react) solution for this!
      window.location.href = "https://fizzgen.me/gallery";
    }, 2 * 1000);
    // Deduct credits from user account
    const requestData = {
      username: user.username,
      currentAccount: userCredits,
      requestedCredits: {},
    };
    requestData.requestedCredits[chain] = "-1";
    const response3 = await fetch(getCreditsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (response3.status !== 200) {
      throw new Error(`There has been a server error (${response.status}).`);
    }
    const data3 = await response3.json();
    if (data3.result !== "success") {
      throw new Error(data.message);
    }
    const newCreditsObject = {
      polygon: data3.data.polygon_credits,
      mumbai: data3.data.polygon_mumbai_credits,
      eth: data3.data.eth_credits,
      goerli: data3.data.eth_goerli_credits,
      avax: data3.data.avax_credits,
      fuji: data3.data.avax_fuji_credits,
    };
    setUserCredits(newCreditsObject);
  } catch (error) {
    console.error(error.message);
    resetAndDismiss(setStep1, setStep2, setStep3);
  }
}

export default duplicateFizzgen;
