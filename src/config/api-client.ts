import axios from "axios";
import { API_URL, AUTH_TOKEN } from "./variables";

export const api = axios.create({
  baseURL: (process.env.NODE_ENV === "development" ? "http://localhost:8080" : API_URL),  
  headers: {
    Authorization: AUTH_TOKEN
  },
});

export const promogateApi = axios.create({
  baseURL: "/api"
});