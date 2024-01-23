"use client";

import { useUser } from "@/application/states/user-store";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Redirector } from "@/domain/@types";
import { Dispatch, SetStateAction } from "react";
import { api } from "@/config";
import { useMutation } from "react-query";
import { queryClient } from "@/app/providers";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "..";
import { PulseLoader } from "react-spinners";
import { UpdateRedirectorForm } from "../forms/update-redirector";

type UpdateRedirectorDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  redirector: Redirector;
}

export function UpdateRedirectorDialog({ setOpen, redirector }: UpdateRedirectorDialogProps) {
  const { toast } = useToast();
  const user = useUser(state => state.user);
  if (!user || !user.user_profile) {
    toast({
      title: "Erro ao tentar buscar os dados do usuário.",
      variant: "destructive"
    });
    setOpen(false);
  }

  const { handleSubmit } = useForm({ mode: "onSubmit" });

  const handleDeleteRedirector = async () => {
    await api.put(`/redirector/update/${redirector.id}`);
  };

  const mutation = useMutation({
    mutationFn: async () => await handleDeleteRedirector(),
    onSuccess: () => {
      toast({
        title: "Redirecionador removido com sucesso!",
        variant: "default"
      });
      setOpen(false);
      queryClient.invalidateQueries(["redirectors", user?.user_profile?.resources.id]);
    },
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.response.data.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = async () => {
    await mutation.mutateAsync();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Atualizar o redirecionador
        </DialogTitle>
      </DialogHeader>
      <UpdateRedirectorForm setOpen={setOpen}/>
    </DialogContent>
  );
}