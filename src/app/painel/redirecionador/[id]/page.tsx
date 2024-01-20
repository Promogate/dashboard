"use client";

import { Button, PageHeader } from "@/components";
import { CreateGroupForm } from "@/components/forms/create-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { BiEditAlt, BiError } from "react-icons/bi";
import { LiaCopySolid } from "react-icons/lia";
import { TfiAngleLeft } from "react-icons/tfi";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { TbTrash } from "react-icons/tb";
import { UpdateGroupDialog } from "@/components/dialogs/update-group";

type RedirectorProps = {
  id: string;
  title: string;
  description: string;
  redirectorLink: string;
  timesClicked: string;
  resources_id: string;
  groups: Group[]
}

type Group = {
  id: string;
  title: string;
  destination_link: string;
  members: number;
  limit: number;
  redirector_id: string;
}

export default function Page() {
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const shortlinkRef = useRef<HTMLInputElement>(null);
  const whatsappLinkRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, refetch, isRefetching } = useQuery<RedirectorProps>(["redirector", params.id], {
    queryFn: async () => {
      const { data } = await api.get(`/redirector/find-by-id/${params.id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    onError: () => {
      toast({ title: "Falha ao buscar informações do redirecionador. Tente novamente.", variant: "destructive" });
    }
  });

  const handleCopyShortlink = (linkRef: any) => {
    if (linkRef.current) {
      copyToClipboard(linkRef.current.value);
      toast({
        title: "Link copiado com sucesso!",
        variant: "default",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto py-10 my-10 h-32 rounded-md border bg-white flex justify-center items-center">
        <PulseLoader color="#2a2a2a" size={16} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto py-10 my-10 h-32 rounded-md border bg-white flex flex-col justify-center items-center">
        <BiError size={32} />
        <h2>Houve algum erro ao tentar encontrar dados do redirecionado.</h2>
      </div>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="w-full">
          <div className="flex justify-between item-center">
            <Link href={"/painel/redirecionador"}>
              <Button>
                <TfiAngleLeft />
              </Button>
            </Link>
            <div className="flex gap-2 align-middle">
              <Input type="text" value={data?.redirectorLink} readOnly ref={shortlinkRef} />
              <Button variant={"ghost"} className="bg-gray-200" onClick={() => handleCopyShortlink(shortlinkRef)}>
                <LiaCopySolid />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center my-8">
            <PageHeader>{data?.title}</PageHeader>
            <div className="flex items-center gap-4">
              <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out" onClick={() => refetch()}>
                {isRefetching && <PulseLoader color="#2a2a2a" size={4} />}
                Atualizar grupos
              </Button>
              <DialogTrigger asChild>
                <Button variant={"default"} className="bg-[#5528ff] text-white">
                  Adicionar grupo
                </Button>
              </DialogTrigger>
            </div>
          </div>
          {
            data?.groups.length === 0 ? (
              <div className="mx-auto py-10 my-10 h-32 rounded-md border bg-white flex flex-col justify-center items-center">
                <BiError size={32} />
                <h2>Você ainda não tem grupos cadastrados nesse redirecionador </h2>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                {data?.groups.map((group, index) => {
                  return (
                    <div key={index} className="border rounded-lg bg-white p-4">
                      <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          {group.title}
                        </h2>
                        <div className="flex gap-2 items-center">
                          <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out" size={"sm"} onClick={() => { }}>
                            <TbTrash />
                          </Button>
                          <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
                            <DialogTrigger asChild>
                              <Button className="bg-[#5528ff] hover:bg-[#4521cc] text-white transition-all duration-200 ease-in-out" size={"sm"}>
                                <BiEditAlt />
                              </Button>
                            </DialogTrigger>
                            <UpdateGroupDialog setOpen={setOpenUpdate} groupId={group.id}/>
                          </Dialog>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex gap-2 align-middle">
                          <Input type="text" value={group.destination_link} readOnly ref={whatsappLinkRef} />
                          <Button variant={"ghost"} className="bg-gray-200" onClick={() => handleCopyShortlink(whatsappLinkRef)}>
                            <LiaCopySolid />
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 mt-4">
                          <div className="flex flex-col">
                            <h3>Qtn. de membros</h3>
                            {group.members}
                          </div>
                          <div className="flex flex-col">
                            <h3>Limite de membros</h3>
                            {group.limit}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Adicionar novo redirecionador
            </DialogTitle>
          </DialogHeader>
          <CreateGroupForm setOpen={setOpen} redirectorId={params.id as string} />
        </DialogContent>
      </Dialog>
    </>
  );
}