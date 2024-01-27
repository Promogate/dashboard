"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { parse } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "..";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { useMutation } from "react-query";
import { api } from "@/config";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/app/providers";
import { Product } from "../products-table/columns";

type UpdateProductInput = {
  image?: string;
  title?: string;
  price?: string;
  oldPrice?: string;
  destinationLink?: string;
  storeName?: string;
  expirationDate?: Date;
  description?: string;
}

const schema = z.object({
  image: z.string().url({ message: "A image deve ser uma url válida" }).optional(),
  title: z.string().optional(),
  price: z.string().regex(/^(\d{1,3}(\.\d{3})*(?:,\d{2})?|\d{1,}(?:,\d{2})?)$/g).optional(),
  oldPrice: z.string().regex(/^(\d{1,3}(\.\d{3})*(?:,\d{2})?|\d{1,}(?:,\d{2})?)$/g).optional(),
  destinationLink: z.string().optional(),
  storeName: z.string().optional(),
  expirationDate: z.date().optional(),
  description: z.string().optional(),
});

type UpdateProductFormProps = {
  product: Product
}

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      title: product.title,
      price: product.price,
      description: product.description,
      destinationLink: product.destination_link,
      expirationDate: parse(product.expiration_date, "yyyy-MM-dd\'T\'HH:mm:ss", new Date()),
      image: product.image,
      oldPrice: product.old_price,
      storeName: product.store_name
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: UpdateProductInput) => {
      await api.put(`/resources/${product.resources_id}/offer/${product.id}/update`, values);
    },
    onSuccess: () => {
      toast({
        title: "Produto criado com sucesso!"
      });
      queryClient.invalidateQueries(["products", product.resources_id]);
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
                          <span>{field.value?.toString()}</span>
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