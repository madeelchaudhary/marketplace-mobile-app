import { ImagePickerAsset } from "expo-image-picker";
import api from "./client";

const endpoint = "/listings";

const getListings = () => api.get(endpoint);

const addListing = async (listing: any, options = {}) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image: ImagePickerAsset) => {
    const img = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: "image/jpeg",
    } as any;
    data.append("images", img);
  });

  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }

  return api.post(endpoint, data, {
    ...options,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export { getListings, addListing };
