import { authToken, loggedUser } from "@/application/atoms";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { SignInFormInput, SignInFormOutput } from "@/domain/@types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

async function signInUser(values: SignInFormInput): Promise<SignInFormOutput> {
  const { data } = await api.post<SignInFormOutput>("/users/signin", values);
  return data;
}



export function useAuthentication() {
  const { toast } = useToast();
  const router = useRouter();
  const [loggerUserData, setLoggedUser] = useRecoilState(loggedUser);
  const [, setAuthToken] = useRecoilState(authToken);

  const signIn = useMutation(async (values: SignInFormInput) => await signInUser(values), {
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.response.data.message,
        variant: "destructive"
      });
    },
    onSuccess: ({ user, token }) => {
      setLoggedUser(user);
      setAuthToken(token);
      setCookie("promogate.token", token);
      api.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      });
      router.push("/painel");
    }
  });

  return {
    signIn,
  };
}