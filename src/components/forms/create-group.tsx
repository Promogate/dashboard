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
import { queryClient } from "@/app/providers";
import { useUser } from "@/application/states/user-store";

type CreateGroupInput = {
  title: string;
  destinationLink: string;
  members: string;
  limit: string;
}

const schema = z.object({
  title: z.string({ required_error: "É obrigatório" }),
  destinationLink: z.string({ required_error: "É obrigatório" }).url("Insira um url válida"),
  members: z.string({ required_error: "É obrigatório" }).regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros."),
  limit: z.string({ required_error: "É obrigatório" }).regex(/^(102[0-4]|10[0-1][0-9]|[1-9][0-9]{0,2}|0)$/, "O máximo são 1024 membros.")
});

type createGroupSchema = z.infer<typeof schema>;

type CreateGroupFormProps = {
  setOpen: (value: boolean) => void;
  redirectorId: string;
}

export function CreateGroupForm({ setOpen, redirectorId }: CreateGroupFormProps) {
  const user = useUser(state => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const { toast } = useToast();
  const form = useForm<createGroupSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  });
  const mutation = useMutation({
    mutationFn: async (values: CreateGroupInput) => {
      await api.post(`/redirector/${redirectorId}/group/create`, values);
    },
    onSuccess: () => {
      toast({
        title: "Grupo adicionado com sucesso!",
        variant: "default",
      });
      setOpen(false);
      queryClient.invalidateQueries(["redirector", redirectorId]);
      queryClient.invalidateQueries(["redirectors", resourcesId]);
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<CreateGroupInput> = async (values) => {
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
              <FormLabel>Título do grupo</FormLabel>
              <FormControl>
                <Input placeholder="Redirecionador de grupos de desconto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destinationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do grupo</FormLabel>
              <FormControl>
                <Input placeholder="Link do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtn. de membros atuais</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 105" {...field} type="text" inputMode="numeric"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite (padrão: 1024)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 512" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="bg-[#5528FF] text-white">
          {mutation.isLoading && <PulseLoader color="#2a2a2a" size={4} />}
          Adicionar
        </Button>
      </form>
    </Form>
  );
}