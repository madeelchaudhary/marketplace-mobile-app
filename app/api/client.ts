import { create } from "apisauce";
import cache from "../lib/cache";
import auth from "../lib/auth";

const api = create({
  baseURL: "http://192.168.10.2:9000/api",
  timeout: 5000,
});

api.addAsyncRequestTransform(async (request) => {
  const token = await auth.getToken();
  if (!token) return;
  request.headers!["x-auth-token"] = token;
});

const get = api.get;
api.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    await cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? ({ ok: true, data } as any) : response;
};

export default api;
