function filterGallery(
  user,
  galleryData,
  showOwned,
  showMinted,
  sortMostRecent
) {
  let filteredData;
  if (!showOwned && !showMinted) {
    // return only items that aren't minted or owned by user -- should be []
    filteredData = galleryData.filter(
      (obj) =>
        obj.owner !== user.username &&
        obj.owner !== user.attributes.email &&
        obj.minter !== user.username &&
        obj.minter !== user.attributes.email
    );
  } else if (!showOwned) {
    // only return items that were minted by user
    filteredData = galleryData.filter(
      (obj) =>
        obj.minter === user.username || obj.minter === user.attributes.email
    );
  } else if (!showMinted) {
    // only return items that are owned by user
    filteredData = galleryData.filter(
      (obj) =>
        obj.owner === user.username || obj.owner === user.attributes.email
    );
  } else {
    if (galleryData) filteredData = galleryData.slice();
  }
  if (filteredData && sortMostRecent) {
    filteredData.reverse();
  }

  return filteredData;
}

export default filterGallery;
