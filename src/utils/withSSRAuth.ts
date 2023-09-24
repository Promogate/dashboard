import { AuthTokenError } from "@/domain/errors";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next";
import { destroyCookie, parseCookies } from "nookies";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P> | undefined> => {
    const cookies = parseCookies(ctx);
    const token = cookies["promogate.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      };
    };

    try {
      return await fn(ctx);
    } catch (err: any) {
      if (err instanceof AuthTokenError || err.response.status === 401) {
        destroyCookie(ctx, "promogate.token");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          }
        };
      }
    }
  };
}