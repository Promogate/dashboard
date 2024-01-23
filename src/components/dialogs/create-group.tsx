import { CreateGroupForm } from "../forms/create-group";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type CreateGroupDialogProps = {
  setOpen: (value: boolean) => void;
  redirectorId: string;
}

export function CreateGroupDialog({ setOpen, redirectorId }: CreateGroupDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Adicionar novo grupo
        </DialogTitle>
      </DialogHeader>
      <CreateGroupForm setOpen={setOpen} redirectorId={redirectorId} />
    </DialogContent>
  );
}