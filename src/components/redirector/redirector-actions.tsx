import { LiaCopySolid } from "react-icons/lia";
import { Button } from "..";
import { Input } from "../ui/input";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { useRef, useState } from "react";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { useToast } from "../ui/use-toast";
import { useRedirectorContext } from "./redirector-context";
import { FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DeleteRedirectorDialog } from "../dialogs/delete-redirector";
import { PiArrowRightThin } from "react-icons/pi";
import { UpdateRedirectorDialog } from "../dialogs/update-redirector";

export function RedirectorActions() {
  const shortlinkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { redirector } = useRedirectorContext();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleCopyShortlink = () => {
    if (shortlinkRef.current) {
      copyToClipboard(shortlinkRef.current.value);
      toast({
        title: "Link copiado com sucesso!",
        variant: "default",
      });
    }
  };
  return (
    <>
      <div className="flex gap-2 align-middle">
        <Input type="text" value={redirector.redirectorLink} readOnly ref={shortlinkRef} />
        <Button className="bg-gray-200" onClick={handleCopyShortlink} size={"sm"}>
          <LiaCopySolid />
        </Button>
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
          <DialogTrigger asChild>
            <Button className="bg-[#5528ff] hover:bg-[#4521cc] text-white transition-all duration-200 ease-in-out" size={"sm"}>
              <BiEditAlt />
            </Button>
          </DialogTrigger>
          <UpdateRedirectorDialog setOpen={setOpenUpdate} redirector={redirector} />
        </Dialog>
        <Link href={`/painel/redirecionador/${redirector.id}`}>
          <Button className="bg-gray-200" size={"sm"}>
            <PiArrowRightThin />
          </Button>
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out" size={"sm"}>
              <FaRegTrashAlt />
            </Button>
          </DialogTrigger>
          <DeleteRedirectorDialog setOpen={setOpen} redirector={redirector} />
        </Dialog>
      </div>
    </>
  );
};