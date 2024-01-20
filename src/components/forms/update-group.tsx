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
import { useRedirectorContext } from "../redirector/redirector-context";

type UpdateGroupInput = {
  title?: string;
  destinationLink?: string;
  members?: string;
  limit?: string;
}

const schema = z.object({
  title: z.string({ required_error: "É obrigatório" }).optional(),
  destinationLink: z.string({ required_error: "É obrigatório" }).url("Insira um url válida").optional(),
  members: z.string({ required_error: "É obrigatório" }).regex(/^(?:[1-9]\d{0,2}|102[0-4]?)$/, "O máximo são 1024 membros.").optional(),
  limit: z.string({ required_error: "É obrigatório" }).regex(/^(?:[1-9]\d{0,2}|102[0-4]?)$/, "O máximo são 1024 membros.").optional()
});

type updateGroupSchema = z.infer<typeof schema>;

type UpdateGroupFormProps = {
  setOpen: (value: boolean) => void;
  groupId: string;
}

export function UpdateGroupForm({ setOpen, groupId }: UpdateGroupFormProps) {
  const user = useUser(state => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const { redirector } = useRedirectorContext();
  const { toast } = useToast();
  const form = useForm<updateGroupSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur"
  });
  const mutation = useMutation({
    mutationFn: async (values: UpdateGroupInput) => {
      await api.post(`/redirector/group/update/${groupId}`, values);
    },
    onSuccess: () => {
      toast({
        title: "Grupo adicionado com sucesso!",
        variant: "default",
      });
      setOpen(false);
      queryClient.invalidateQueries(["redirector", redirector.id]);
      queryClient.invalidateQueries(["redirectors", resourcesId]);
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateRedirector: SubmitHandler<UpdateGroupInput> = async (values) => {
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