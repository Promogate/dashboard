import { User, useUser } from "@/application/states/user-store";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { SignInFormInput, SignInFormOutput } from "@/domain/@types";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

async function getUserData(id: string): Promise<User> {
  const { data } = await api.get(`/users/me/${id}`);
  return data;
}

async function signInUser(values: SignInFormInput): Promise<SignInFormOutput> {
  const { data } = await api.post<SignInFormOutput>("/users/signin", values);
  return data;
}

export function useAuthentication() {
  const { toast } = useToast();
  const router = useRouter();
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);

  const signIn = useMutation(async (values: SignInFormInput) => await signInUser(values), {
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.message,
        variant: "destructive"
      });
    },
    onSuccess: ({ user, token }) => {
      console.log("Success signin");
      setUser(user);
      setCookie("promogate.token", token);
      api.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      });
      router.push("/painel");
    }
  });

  const signOut = () => {
    deleteCookie("promogate.token");
    setUser(null);
    api.interceptors.request.use(function (config) {
      config.headers.Authorization = "";

      return config;
    });
    router.push("/");
  };

  const meData = useQuery({
    queryKey: ["userData", user?.id],
    queryFn: async () => await getUserData(user?.id as string),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    retry: 3,
    onSuccess: (user) => {
      setUser(user);
    }
  });

  return {
    signIn,
    signOut,
    meData
  };
}