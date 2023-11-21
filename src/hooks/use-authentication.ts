import { api } from "@/config";
import { SignInFormInput, SignInFormOutput } from "@/domain/@types";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

async function signInUser(values: SignInFormInput): Promise<SignInFormOutput> {
  const { data } = await api.post<SignInFormOutput>("/users/signin", values);
  return data;
}

export function useAuthentication() {
  const signIn = useMutation(signInUser, {
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });

  return {
    signIn
  };
}