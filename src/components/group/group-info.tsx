import { LiaCopySolid } from "react-icons/lia";
import { Button } from "..";
import { Input } from "../ui/input";
import { useRef } from "react";
import { toast } from "../ui/use-toast";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

type GroupInfoProps = {
  destinationLink: string;
  members: number;
  limit: number;
}

export function GroupInfo({ destinationLink, members, limit }: GroupInfoProps) {
  const whatsappLinkRef = useRef<HTMLInputElement>(null);

  const handleCopyShortlink = (linkRef: any) => {
    if (linkRef.current) {
      copyToClipboard(linkRef.current.value);
      toast({
        title: "Link copiado com sucesso!",
        variant: "default",
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 align-middle">
        <Input type="text" value={destinationLink} readOnly ref={whatsappLinkRef} />
        <Button variant={"ghost"} className="bg-gray-200" onClick={() => handleCopyShortlink(whatsappLinkRef)}>
          <LiaCopySolid />
        </Button>
      </div>
      <div className="grid grid-cols-4 mt-4">
        <div className="flex flex-col">
          <h3>Qtn. de membros</h3>
          {members}
        </div>
        <div className="flex flex-col">
          <h3>Limite de membros</h3>
          {limit}
        </div>
      </div>
    </div>
  );
}