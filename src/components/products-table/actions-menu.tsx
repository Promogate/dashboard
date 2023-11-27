import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { LuMoreHorizontal } from "react-icons/lu";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "..";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Product } from "./columns";

type StateProps = {
  contentType: "edit" | "delete"
}

type ActionsMenuProps = {
  row: Row<Product>
}

export function ActionsMenu({ row }: ActionsMenuProps) {
  const [state, setState] = useState<StateProps>({ contentType: "edit" });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"sm"}>
            <LuMoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setState({ contentType: "edit" })}>
              Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-red-500 cursor-pointer focus:text-red-500" onClick={() => setState({ contentType: "delete" })}>
              Deletar
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {state.contentType === "delete" ? `Deletar: ${row.original.title}` : `Editar: ${row.original.title}`}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};