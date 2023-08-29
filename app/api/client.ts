import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.10.6:9000/api",
});

export default api;
