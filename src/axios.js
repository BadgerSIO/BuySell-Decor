import axios from "axios";

export const API = axios.create({
  baseURL: "https://buysell-decor-server.vercel.app",
});
export default API;
