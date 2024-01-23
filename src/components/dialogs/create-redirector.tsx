import { Dispatch, SetStateAction } from "react";
import { CreateGroupForm } from "../forms/create-group";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type  CreateRedirectorDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  redirectorId: string;
}

export function CreateRedirectorDialog({ setOpen , redirectorId}: CreateRedirectorDialogProps) {

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Adicionar novo redirecionador
        </DialogTitle>
      </DialogHeader>
      <CreateGroupForm setOpen={setOpen} redirectorId={redirectorId} />
    </DialogContent>
  );
}