"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "..";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { useUser } from "@/application/states/user-store";
import { useMutation } from "react-query";
import { api } from "@/config";
import { useToast } from "../ui/use-toast";

type CreateProductInput = {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  destinationLink: string;
  storeName: string;
  expirationDate: Date;
  description?: string;
}

const schema = z.object({
  image: z.string({ required_error: "O link da imagem do produto é obrigatório." }).url({ message: "A image deve ser uma url válida" }),
  title: z.string({ required_error: "O título do produto é obrigatório." }),
  // price: z.string().regex(/([0-9]{3}),([0-9]{2}$)/g),
  price: z.string().regex(/^(\d{1,3}(\.\d{3})*(?:,\d{2})?|\d{1,}(?:,\d{2})?)$/g),
  oldPrice: z.string().regex(/^(\d{1,3}(\.\d{3})*(?:,\d{2})?|\d{1,}(?:,\d{2})?)$/g).optional(),
  destinationLink: z.string({ required_error: "O link de destino é obrigatório." }),
  storeName: z.string({ required_error: "O nome da loja é obrigatório." }),
  expirationDate: z.date({ required_error: "Escolha uma data de expiração." }),
  description: z.string().optional(),
});

export function CreateProductForm() {
  const user = useUser(state => state.user);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateProductInput) => {
      await api.post(`/resources/${user?.user_profile?.resources.id}/offer/create`, values);
    },
    onSuccess: () => {
      toast({
        title: "Produto criado com sucesso!"
      });
    }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutation.mutateAsync(values);
  }

  return (
    <ScrollArea className="h-96 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6 pl-1 pr-4 py-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image do produto</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com.br" {...field} />
                </FormControl>
                <FormDescription>
                  A imagem será mostrada como imagem do produto para os seus usuários.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Produto XYZ" {...field} />
                </FormControl>
                <FormDescription>
                  Nome do seu produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço final</FormLabel>
                <FormControl>
                  <Input placeholder="99,00" {...field} />
                </FormControl>
                <FormDescription>
                  Preço atual do produto. Lembre-se de incluir pontos e vírgulas, ex.: 1.150,00 ou 150,00
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço anterior</FormLabel>
                <FormControl>
                  <Input placeholder="129,00" {...field} />
                </FormControl>
                <FormDescription>
                  Em caso de preço com desconto, preencher este campo é essencial para marcação. Lembre-se de incluir pontos e vírgulas, ex.: 1.150,00 ou 150,00
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destinationLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de destino do produto</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com.br" {...field} />
                </FormControl>
                <FormDescription>
                  Seu link de afiliado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da loja</FormLabel>
                <FormControl>
                  <Input placeholder="Americanas" {...field} />
                </FormControl>
                <FormDescription>
                  Nome da loja que está oferendo o produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data em que o produto expira</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do produto</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Descreva em poucas palavras o produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end py-4">
            <Button type="submit" className="bg-[#5528ff] text-white">
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}