import api from "./client";

const endpoint = "/messages";

const getMessages = () => api.get(endpoint);

const send = (message: any, listingId: any) =>
  api.post(endpoint, { message, listingId });

export default {
  getMessages,
  send,
};
