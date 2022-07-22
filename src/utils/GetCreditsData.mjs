import { getCreditsApi } from "./apiEndpoints.mjs";

async function getCreditsData(username) {
  try {
    const response = await fetch(getCreditsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    const data = await response.json();
    //Check to see if account exists for username
    if ("data" in data) {
      const creditsObject = {
        polygon: data.data.polygon_credits,
        mumbai: data.data.polygon_mumbai_credits,
        eth: data.data.eth_credits,
        goerli: data.data.eth_goerli_credits,
        avax: data.data.avax_credits,
        fuji: data.data.avax_fuji_credits,
      };
      return creditsObject;
    } else {
      //This is activated when no user account is located for username
      return {};
    }
  } catch (error) {
    console.error(error);
  }
}

export default getCreditsData;
