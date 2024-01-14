import { LiaCopySolid } from "react-icons/lia";
import { Button } from "..";
import { Input } from "../ui/input";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { useRef } from "react";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { useToast } from "../ui/use-toast";
import { useRedirectorContext } from "./redirector-context";

export function RedirectorActions() {
  const shortlinkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { redirector } = useRedirectorContext();

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
    <div className="flex gap-2 align-middle">
      <Input type="text" value={redirector.redirectorLink} readOnly ref={shortlinkRef} />
      <Button variant={"ghost"} className="bg-gray-200" onClick={handleCopyShortlink}>
        <LiaCopySolid />
      </Button>
      <Link href={`/painel/redirecionador/${redirector.id}`}>
        <Button variant="outline">
          <BiEditAlt />
        </Button>
      </Link>
    </div>
  );
};