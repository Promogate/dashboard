import { api } from "@/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookiesStorage = cookies();
  if (cookiesStorage.get("promogate.token")) {
    api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${cookiesStorage.get("promogate.token")}`
      }
    }).then((response) => {
      const { data } = response;
    }).catch((error) => {
      return NextResponse.redirect(new URL("/", request.url));
    });
  }
  if (!cookiesStorage.get("promogate.token")) {
    return NextResponse.redirect(new URL("/sem-permissao", request.url));
  }
}

export const config = {
  matcher: "/painel/:path*"
};