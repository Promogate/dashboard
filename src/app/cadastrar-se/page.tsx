"use client";

import { useUser } from "@/application/states/user-store";
import { Button } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { PulseLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  email: z.string({ required_error: "Email é obrigatório" }).email("Você precisa inserir um email válido"),
  password: z.string({ required_error: "Senha é obrigatório" }).min(6, "A senha deve conter no mínimo 6 e no máximo 12 caracteres").max(12, "A senha conter no máximo 12 caracteres"),
  confirmPassword: z.string({ required_error: "Confirmar senha é obrigatório" }),
  agreeWithPolicies: z.boolean({ required_error: "Você deve concordar com os termos de uso e as  políticas de privacidade" }).refine((value) => value === true, {
    message: "Você deve concordar com os termos e as políticas.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas precisam ser iguais"
});


export default function Page() {
  const [showPass, setShowPass] = useState(false);
  const { toast } = useToast();
  const { setUser } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const { data } = await api.post("/users/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
        agreeWithPolicies: values.agreeWithPolicies,
      });
      setUser(data.id);
      setCookie("promogate.token", data.token);
      router.push("/painel");
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Conta criada com sucesso."
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao tentar criar conta",
        content: error.message
      });
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    await mutation.mutateAsync(values);
  };

  return (
    <>
      <section className="grid grid-cols-2 h-screen justify-center">
        <div className="h-screen bg-[#5528FF] grid place-content-center">
          <div className="max-w-[400px] text-white grid gap-4">
            <h1 className="text-2xl uppercase font-semibold">
              Controle todos seus links de afiliado que você compartilha.
            </h1>
            <p className="font-thin">
              A Promogate faz o tracking e gerencia seus links de maneira incrivelmente fácil. Você pode ganhar ainda mais, sem precisar adicionar mais trabalho.
            </p>
          </div>
        </div>
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <div className="relative h-[30px] w-[120px] mx-auto mb-8">
            <Image src="/promogate.svg" alt="Logo Promogate" fill />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Alan Turing" className="w-80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="alan.turing@example.com" className="w-80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type={showPass ? "text" : "password"} className="w-80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input type={showPass ? "text" : "password"} className="w-80"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeWithPolicies"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2 w-80 pt-4">
                        <Checkbox id="agreeWithPolicies" checked={field.value} onCheckedChange={field.onChange} />
                        <label
                          htmlFor="agreeWithPolicies"
                          className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs"
                        >
                          Aceitar {" "}
                          <a href="/termos-de-uso" target="_blank" className="underline">
                            termos de uso
                          </a>
                          {" "} e {" "}
                          <a href="/politicas-de-privacidade" target="_blank" className="underline">
                            políticas de privacidade
                          </a>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="primary_action" className="w-80 mt-4 flex items-center gap-x-2">
                {mutation.isLoading ?? <PulseLoader color="#2a2a2a" size={16} />}
                Criar conta
              </Button>
            </form>
          </Form>
          <div className="flex justify-between items-center w-80 mt-8">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onClick={() => setShowPass(!showPass)} />
              <label
                htmlFor="terms"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
                text-xs"
              >
                Mostrar senha
              </label>
            </div>
            <Link href="/" className="text-xs underline">Já tenho uma conta</Link>
          </div>
        </div>
      </section>
    </>
  );
}