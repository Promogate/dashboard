import { setCookie } from "cookies-next";

export function useCookies() {
  function createAuthCookie(token: string) {
    return setCookie("promogate.token", token);
  }
  
  return {
    createAuthCookie: (token: string) => createAuthCookie(token)
  };
}