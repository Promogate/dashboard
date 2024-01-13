"use client";

import { SignInFormInput } from "@/domain/@types";
import { useAuthentication } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { z } from "zod";
import { FormErrorMessage } from "./form-error-message";
import { Button } from "./ui/button";

const SignInFormSchema = z.object({
  email: z.string().min(1, "Email não pode estar vazio.").email("Insira um email válido"),
  password: z.string().min(1, "Senha não poder estar vazio.")
});

type signInFormSchema = z.infer<typeof SignInFormSchema>;

export function AuthForm() {
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<signInFormSchema>({
    resolver: zodResolver(SignInFormSchema)
  });
  const { signIn } = useAuthentication();

  const handleSignInSubmit: SubmitHandler<SignInFormInput> = async values => {
    await signIn.mutateAsync(values);
  };

  return (
    <div className="h-screen w-full grid place-content-center gap-12">
      <div className="relative h-[30px] w-[120px] mx-auto">
        <Image src="/promogate.svg" alt="Logo Promogate" fill />
      </div>
      <form className="w-[320px] flex flex-col gap-4" onSubmit={handleSubmit(handleSignInSubmit)}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs text-gray-700">Email</label>
          <input className="border border-gray-600 rounded-md py-2 px-2 placeholder:font-light placeholder:text-sm" {...register("email")} id="email" placeholder="alan.turing@example.com.br" />
          {errors.email && <FormErrorMessage message={errors.email.message} />}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xs text-gray-700">Senha</label>
          <input className="border border-gray-600 rounded-md p-2" {...register("password")} id="password" type={showPass ? "text" : "password"} />
          {errors.password && <FormErrorMessage message={errors.password.message} />}
          <div className="flex gap-2 items-center mt-1 mb-4">
            <input type="checkbox" name="revelPass" id="revelPass" placeholder="Mostrar senha" onChange={() => setShowPass(!showPass)} />
            <label className="text-sm">Mostrar senha</label>
          </div>
        </fieldset>
        <Button className="bg-[#5528ff] py-2 text-white rounded-md transition-all duration-300 ease-in-out flex gap-2 hover:bg-[#3b1ab8]" type="submit" disabled={signIn.isLoading}>
          {signIn.isLoading && <PulseLoader color="#fff" size={4} />}
          Entrar
        </Button>
      </form>
      <div className="flex justify-between w-full items-center">
        <Link href="/recuperar-senha" className="text-xs">Esqueceu a senha?</Link>
        <Link href="/cadastrar-se" className="text-xs">Cadastrar-se</Link>
      </div>
    </div>
  );
}