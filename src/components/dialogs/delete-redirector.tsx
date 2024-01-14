"use client";

import { api } from "@/config";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { PulseLoader } from "react-spinners";
import { Button } from "..";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Redirector } from "@/domain/@types";
import { useUser } from "@/application/states/user-store";
import { queryClient } from "@/app/providers";

type DeleteRedirectorDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  redirector: Redirector;
}

export function DeleteRedirectorDialog({ setOpen, redirector }: DeleteRedirectorDialogProps) {
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
    await api.delete(`/redirector/delete/${redirector.id}`);
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
          Remover redirecionador?
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 pl-1 pr-4 py-4">
        <div className="w-full py-10 my-10 h-32 flex flex-col justify-center items-center text-center">
          <h2>Você tem certeza que quer remover este redirecionador? Não é possível recuperar os dados após removê-lo</h2>
        </div>
        <div className="flex justify-end py-4">
          <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
            {mutation.isLoading && <PulseLoader color="#fff" size={4} />}
            Deletar redirecionador
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};