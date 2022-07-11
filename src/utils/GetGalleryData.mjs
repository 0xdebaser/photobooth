async function getGalleryData(userEmail, galleryApi) {
  const bodyObject = {
    email: userEmail,
  };
  try {
    const response = await fetch(galleryApi, {
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
      console.log(data);
      return data.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default getGalleryData;
