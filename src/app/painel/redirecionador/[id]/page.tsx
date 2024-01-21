"use client";

import { Button, PageHeader } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { BiError } from "react-icons/bi";
import { LiaCopySolid } from "react-icons/lia";
import { TfiAngleLeft } from "react-icons/tfi";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { CreateGroupDialog } from "@/components/dialogs/create-group";
import { Redirector } from "@/domain/@types";
import { Group } from "@/components/group";

export default function Page() {
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const shortlinkRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, refetch, isRefetching } = useQuery<Redirector>(["redirector", params.id], {
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"default"} className="bg-[#5528ff] text-white">
                  Adicionar grupo
                </Button>
              </DialogTrigger>
              <CreateGroupDialog setOpen={setOpen} redirectorId={params.id as string}/>
            </Dialog>
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
                  <Group.Root key={index} redirector={data}>
                    <Group.Header title={group.title}>
                      <Group.Actions group={data.groups[index]}/>
                    </Group.Header>
                    <Group.Info destinationLink={group.destination_link} limit={group.limit} members={group.members}/>
                  </Group.Root>
                );
              })}
            </div>
          )
        }
      </div>
    </>
  );
}