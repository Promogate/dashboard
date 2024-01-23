"use client";

import { useUser } from "@/application/states/user-store";
import { useToast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UpdateGroupForm } from "../forms/update-group";
import { Group } from "@/domain/@types";

type UpdateGroupDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: Group;
}

export function UpdateGroupDialog({ setOpen, group }: UpdateGroupDialogProps) {
  const { toast } = useToast();
  const user = useUser(state => state.user);
  if (!user || !user.user_profile) {
    toast({
      title: "Erro ao tentar buscar os dados do usuário.",
      variant: "destructive"
    });
    setOpen(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Atualizar grupo
        </DialogTitle>
      </DialogHeader>
      <UpdateGroupForm setOpen={setOpen} group={group}/>
    </DialogContent>
  );
}