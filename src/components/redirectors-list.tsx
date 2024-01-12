"use client";

import { useUser } from "@/application/states/user-store";
import { api } from "@/config";
import { useRef } from "react";
import { BiError } from "react-icons/bi";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { LiaCopySolid } from "react-icons/lia";
import { Button } from ".";
import { Input } from "./ui/input";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbHandClick } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { TooltipComponent } from "./tooltip";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { useToast } from "./ui/use-toast";

type Redirector = {
  id: string;
  title: string;
  description: string;
  redirectorLink: string;
  resources_id: string;
  groups: [],
  totalClicks: number | null
}

export function RedirectorsList() {
  const shortlinkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const user = useUser((state) => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await api.get(`/resources/${resourcesId}/redirectors`);
      return response.data;
    },
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5
  });

  const handleCopyShortlink = () => {
    if (shortlinkRef.current) {
      copyToClipboard(shortlinkRef.current.value);
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
        <h2>Houve algum erro ao tentar encontrar os redirecionadores. Tente novamente.</h2>
      </div>
    );
  }

  return (
    <div className="grid 2xl:grid-cols-2 my-6">
      {
        data.map((redirector: Redirector, index: number) => {
          return (
            <div key={index} className="border rounded-lg bg-white p-4">
              <div className="w-full flex justify-between align-middle">
                <h2 className="text-xl font-semibold">
                  {redirector.title}
                </h2>
                <div className="flex gap-2 align-middle">
                  <Input type="text" value={redirector.redirectorLink} readOnly ref={shortlinkRef} />
                  <Button variant={"ghost"} className="bg-gray-200" onClick={handleCopyShortlink}>
                    <LiaCopySolid />
                  </Button>
                </div>
              </div>
              <div className="w-full flex gap-8 items-center">
                <TooltipComponent tooltip="Grupos" data={redirector.groups.length}>
                  <LiaLayerGroupSolid />
                </TooltipComponent>
                <TooltipComponent tooltip="Cliques" data={redirector.totalClicks ?? 0}>
                  <TbHandClick />
                </TooltipComponent>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}