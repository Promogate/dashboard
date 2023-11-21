import { setCookie } from "nookies";

export function useCookies() {
  function createAuthCookie(token: string) {
    return setCookie(null, "promogate.token", token);
  }
  
  return {
    createAuthCookie: (token: string) => createAuthCookie(token)
  };
}