import axios from "axios";
import { parseCookies } from "nookies";
import { API_URL } from "./variables";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: (process.env.NODE_ENV === "development" ? "http://localhost:8080" : API_URL),
  headers: {
    Authorization: `Bearer ${cookies["promogate.token"]}`
  }
});

export const promogateApi = axios.create({
  baseURL: "/api"
});