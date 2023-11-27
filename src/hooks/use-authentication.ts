import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { SignInFormInput, SignInFormOutput } from "@/domain/@types";
import { useMutation } from "react-query";

async function signInUser(values: SignInFormInput): Promise<SignInFormOutput> {
  const { data } = await api.post<SignInFormOutput>("/users/signin", values);
  return data;
}

export function useAuthentication() {
  const { toast } = useToast();
  const signIn = useMutation(signInUser, {
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.response.data.message,
        variant: "destructive"
      });
    }
  });

  return {
    signIn
  };
}