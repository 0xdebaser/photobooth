async function getGalleryData(userName, userEmail) {
  const GET_GALLERY_API =
    "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/dev/get-gallery";

  const bodyObject = {
    username: userName,
    email: userEmail,
  };
  try {
    const response = await fetch(GET_GALLERY_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    if (response.status !== 200) {
      console.error(
        `There was a server error (${response.status}) retrieving gallery data.`
      );
    } else {
      const data = await response.json();
      if (data) {
        console.log(data);
        return data.data;
      } else console.log("No gallery data received.");
    }
  } catch (error) {
    console.error(error);
  }
}

export default getGalleryData;
