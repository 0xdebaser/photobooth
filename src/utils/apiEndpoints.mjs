const dev = true;

export const addDataApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/add-data`;

export const getCreditsApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/get-credits`;

export const getGalleryApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/get-gallery`;

export const mintApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/mint`;

export const storeApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/store-nft-data`;

export const transferApi = `https://4wsfs93fra.execute-api.us-east-1.amazonaws.com/${
  dev ? "dev" : "v1"
}/transfer`;
