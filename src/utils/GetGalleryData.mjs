async function getGalleryData(user, galleryApi) {
  try {
    const response = await fetch(galleryApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      console.error(
        `There was a server error (${response.status}) retrieving gallery data.`
      );
    } else {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default getGalleryData;
