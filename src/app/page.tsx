"use client";

import { AuthContext } from "@/application/contexts";
import { RequestError } from "@/domain/models";
import {
  useToast
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  params: {
    isLogged: string | undefined;
  };
};

type LoginProps = {
  email: string;
  password: string;
};

export default function Page({ params }: PageProps) {
  const toast = useToast();
  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginProps>();

  const mutation = useMutation(async (values: LoginProps) => await signIn(values), {
    onError: (error: AxiosError<RequestError>) => {
      toast({
        status: "error",
        description: error.response?.data.message
      });
    }
  });

  const handleLogin: SubmitHandler<LoginProps> = async (values) => {
    await mutation.mutateAsync(values);
  };

  return (
    <section className="grid grid-cols-2 h-screen justify-center">
      <div className="h-screen">
        Image
      </div>
      <div className="h-screen grid place-content-center">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <input type="text" {...register("email")} className="border border-gray-400" />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs">
              Senha
            </label>
            <input type="text" {...register("password")} className="border border-gray-400" />
          </fieldset>
          <button>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}