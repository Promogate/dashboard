"use client";

import { useUser } from "@/application/states/user-store";
import { useToast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UpdateGroupForm } from "../forms/update-group";

type UpdateGroupDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
}

export function UpdateGroupDialog({ setOpen, groupId }: UpdateGroupDialogProps) {
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
          Atualizar o grupo
        </DialogTitle>
      </DialogHeader>
      <UpdateGroupForm setOpen={setOpen} groupId={groupId}/>
    </DialogContent>
  );
}