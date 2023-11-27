"use client";

import { api } from "@/config";
import { SignInFormInput, SignInFormOutput } from "@/domain/@types";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext } from "react";
import { useRecoilState } from "recoil";
import { loggedUser } from "../atoms";

type SignUpInput = {
  name: string
  email: string;
  password: string;
}

type SignUpOuput = {
  token: string;
  user: {
    id: string,
    name: string,
    email: string,
    created_at: string,
    user_profile: {
      id: string,
      store_image: string,
      store_name: string,
      role: string,
      social_media: ({
        facebook: string | null,
        instagram: string | null,
        whatsapp: string | null,
        telegram: string | null,
        twitter: string | null
      } | null)
    }
  }
}

interface AuthContextProps {
  signIn(input: SignInFormInput): Promise<void>;
  signUp(input: SignUpInput): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [_, setLoggedUser] = useRecoilState(loggedUser);

  async function signIn(input: SignInFormInput): Promise<void> {
    const { data } = await api.post<SignInFormOutput>("/signin", input);
    setCookie(null, "promogate.token", data.token);
    setLoggedUser(data.user);
    router.push("/painel");
  }

  async function signUp(input: SignUpInput): Promise<void> {
    const { data } = await api.post<SignUpOuput>("/users/signup", input);
    setCookie(null, "promogate.token", data.token);
  }

  async function signOut(): Promise<void> {
    destroyCookie(null, "promogate.token");
    setLoggedUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}