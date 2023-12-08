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

const schema = z.object({
  image: z.string().url({ message: "A image deve ser uma url válida" }),
  title: z.string(),
  price: z.string().regex(/([0-9]{3}),([0-9]{2}$)/g),
  oldPrice: z.string().optional(),
  destinationLink: z.string(),
  storeName: z.string(),
  expirationDate: z.string(),
  description: z.string().optional(),
});

export function CreateProductForm() {
  const [date, setDate] = useState<Date>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
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
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Data em que o produto expira</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "d/M/u") : <span>Escolha uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Data em que o produto será removido da lista.
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