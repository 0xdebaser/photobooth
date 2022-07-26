const dev = true;

export const addDataApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/add-data"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/add-data";

export const getCreditsApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/get-credits"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/get-credits";

export const getGalleryApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/get-gallery"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/get-gallery";

export const mintApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/mint"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/mint";

export const storeApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/store-nft-data"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/store-nft-data";

export const transferApi = dev
  ? "https://bhlpjvqu5i.execute-api.us-east-1.amazonaws.com/dev/transfer"
  : "https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/v1/transfer";
