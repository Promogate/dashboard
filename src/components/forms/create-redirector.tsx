import { useUser } from "@/application/states/user-store";
import { api } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { PulseLoader } from "react-spinners";
import { z } from "zod";
import { Button } from "..";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

type CreateRedirectorInput = {
  title: string;
  descriptiont?: string;
}

const schema = z.object({
  title: z.string().min(1, "O título não pode estar vazio."),
  description: z.string().optional()
});

type createRedirectorSchema = z.infer<typeof schema>;

type CreateRedirectorFormProps = {
  setOpen: (value: boolean) => void;
}

export function CreateRedirectorForm({ setOpen }: CreateRedirectorFormProps) {
  const { toast } = useToast();
  const user = useUser((state) => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const form = useForm<createRedirectorSchema>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateRedirectorInput) => {
      await api.post(`/redirector/create`, { ...values, resourcesId });
    },
    onSuccess: () => {
      toast({
        title: "Redirecionador criado com sucesso!",
        variant: "default",
      });
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<CreateRedirectorInput> = async (values) => {
    await mutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(handleCreateRedirector)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Redirecionador de grupos de desconto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Redirecionador com objetivo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <fieldset className="flex flex-col gap-2">
          <label htmlFor="title" className="text-xs text-gray-700">Título</label>
          <input className="border border-gray-600 rounded-md py-2 px-2 placeholder:font-light placeholder:text-sm" {...register("title")} id="email" placeholder="Redirecionador de grupos de desconto" />
          {errors.title && <FormErrorMessage message={errors.title.message} />}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="description" className="text-xs text-gray-700">Descrição (opcional)</label>
          <input className="border border-gray-600 rounded-md py-2 px-2 placeholder:font-light placeholder:text-sm" {...register("description")} id="email" placeholder="Redirecionador com objetivo" />
          {errors.description && <FormErrorMessage message={errors.description.message} />}
        </fieldset> */}
        <Button type="submit" className="bg-[#5528FF] text-white">
          {mutation.isLoading && <PulseLoader color="#2a2a2a" size={4} />}
          Adicionar
        </Button>
      </form>
    </Form>
  );
}