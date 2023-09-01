import api from "./client";
import { AxiosRequestConfig } from "axios";

const login = (
  email: string,
  password: string,
  axiosConfig?: AxiosRequestConfig<any>
) => {
  return api.post("/auth", { email, password }, axiosConfig);
};

const register = (
  { name, email, password }: { name: string; email: string; password: string },
  axiosConfig?: AxiosRequestConfig<any>
) => {
  return api.post("/users", { name, email, password }, axiosConfig);
};

export { login, register };
