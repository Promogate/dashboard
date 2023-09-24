import { api } from "@/config";
import { SignInFormProps } from "@/domain/models";

export async function signInUser(values: SignInFormProps): Promise<{ token: string }> {
  const { data } = await api.post<{ token:string }>("/users/signin", values);
  return {
    token: data.token
  };
}