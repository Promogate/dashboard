import { parseCookies } from "nookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const SOCIALSOUL_API_URL = process.env.NEXT_PUBLIC_SOCIALSOUL_API_URL as string;
const SOCIALSOUL_APP_ID = process.env.NEXT_PUBLIC_SOCIALSOUL_APP_ID as string;
const cookies = parseCookies();
const AUTH_TOKEN = `Bearer ${cookies["promogate.token"]}`;

export {
  API_URL,
  AUTH_TOKEN,
  SOCIALSOUL_API_URL,
  SOCIALSOUL_APP_ID
};
