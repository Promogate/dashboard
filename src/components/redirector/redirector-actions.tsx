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

export function RedirectorActions() {
  const shortlinkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { redirector } = useRedirectorContext();
  const [open, setOpen] = useState(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 align-middle">
        <Input type="text" value={redirector.redirectorLink} readOnly ref={shortlinkRef} />
        <Button variant={"ghost"} className="bg-gray-200" onClick={handleCopyShortlink}>
          <LiaCopySolid />
        </Button>
        <Link href={`/painel/redirecionador/${redirector.id}`}>
          <Button className="bg-[#5528ff] hover:bg-[#4521cc] text-white transition-all duration-200 ease-in-out">
            <BiEditAlt />
          </Button>
        </Link>
        <DialogTrigger asChild>
          <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out">
            <FaRegTrashAlt />
          </Button>
        </DialogTrigger>
      </div>
      <DeleteRedirectorDialog setOpen={setOpen} redirector={redirector}/>
    </Dialog>
  );
};