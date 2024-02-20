import { api } from "@/config";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const promogateToken = getCookie("promogate.token", { cookies });
  if (promogateToken) {
    api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${promogateToken}`
      }
    }).then((response) => {
      const { data } = response;
    }).catch((error) => {
      return NextResponse.redirect(new URL("/", request.url));
    });
  }
  if (!promogateToken) {
    return NextResponse.redirect(new URL("/sem-permissao", request.url));
  }
}

export const config = {
  matcher: "/painel/:path*"
};