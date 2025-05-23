import { TbTrash } from "react-icons/tb";
import { Button } from "..";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { BiEditAlt } from "react-icons/bi";
import { UpdateGroupDialog } from "../dialogs/update-group";
import { useState } from "react";
import { Group } from "@/domain/@types";
import { DeleteGroupDialog } from "../dialogs/delete-group";

type GroupActionsProps = {
  group: Group;
}

export function GroupActions({ group }: GroupActionsProps) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger>
          <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out" size="icon" onClick={() => { }}>
            <TbTrash />
          </Button>
          <DeleteGroupDialog setOpen={setOpenDelete} group={group}/>
        </DialogTrigger>
      </Dialog>
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogTrigger asChild>
          <Button className="bg-[#5528ff] hover:bg-[#4521cc] text-white transition-all duration-200 ease-in-out" size="icon">
            <BiEditAlt />
          </Button>
        </DialogTrigger>
        <UpdateGroupDialog setOpen={setOpenUpdate} group={group} />
      </Dialog>
    </>
  );
}