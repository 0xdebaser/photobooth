import { addDataApi, mintApi, storeApi } from "../apiEndpoints.mjs";
import { resetAndDismiss } from "./Helpers.mjs";
import getGalleryData from "../GetGalleryData.mjs";

async function fizzgenMe(
  user,
  imgUrl,
  setStep1,
  setStep2,
  setStep3,
  setGalleryData
) {
  try {
    //STEP 1: generate JSON data for NFT and send to generation server
    setStep1("started");
    setStep2(null);
    setStep3(null);
    const currentDate = new Date();
    const currentUTC = currentDate.toUTCString();

    const nftData = {
      username: user.username,
      name: "Fizzgen",
      description: `Fizzgen originally created by ${user.attributes["custom:artistName"]} at ${currentUTC}.`,
      image: imgUrl,
    };
    const body = await JSON.stringify(nftData);
    const response = await fetch(storeApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (response.status !== 200) {
      alert(
        `There has been a server error (${response.status}). Please try again.`
      );
      resetAndDismiss(setStep1, setStep2, setStep3);
    } else {
      const data = await response.json();
      if (data.result !== "success") {
        alert(`${data.message} Please try again.`);
        resetAndDismiss(setStep1, setStep2, setStep3);
      } else {
        setStep1("finished");
        nftData.tokenURI = data.ipfsUrl;
        nftData.imgS3Url = data.s3URL;

        //STEP 2: mint NFT
        setStep2("started");
        const mintData = {
          tokenUri: nftData.tokenURI,
          chain: "mumbai",
        };
        const response2 = await fetch(mintApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mintData),
        });
        if (response2.status !== 200) {
          alert(
            `There has been a server error (${response2.status}). Please try again.`
          );
          resetAndDismiss(setStep1, setStep2, setStep3);
        } else {
          const data2 = await response2.json();
          if (data2.result !== "success") {
            alert(`${data2.message}. Please try again.`);
            resetAndDismiss(setStep1, setStep2, setStep3);
          } else {
            setStep2("finished");
            // STEP 3: Add data to fizzgen mondodb
            setStep3("started");
            //Set data for adding to fizzgen mondodb
            nftData.contract = data2.contract;
            nftData.network = data2.network;
            nftData.tokenId = data2.tokenID;
            nftData.mintTxn = data2.txnHash;
            nftData.originalCreationDate = currentUTC;
            nftData.minter = user.username;
            nftData.owner = user.username;
            nftData.minterEmail = user.attributes.email;
            delete nftData.image;
            //Send data to server
            const response3 = await fetch(addDataApi, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(nftData),
            });
            if (response3.status !== 200) {
              alert(
                `There has been a server error (${response3.status}). Please try again.`
              );
              resetAndDismiss(setStep1, setStep2, setStep3);
            } else {
              const data3 = await response3.json();
              if (data3.result !== "success") {
                alert(`${data3.message}. Please try again.`);
                resetAndDismiss(setStep1, setStep2, setStep3);
              } else {
                setStep3("finished");
                setGalleryData(
                  await getGalleryData(user.username, user.attributes.email)
                );
                setTimeout(() => {
                  resetAndDismiss(setStep1, setStep2, setStep3);
                }, 1.5 * 1000);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    resetAndDismiss(setStep1, setStep2, setStep3);
  }
}

export default fizzgenMe;
