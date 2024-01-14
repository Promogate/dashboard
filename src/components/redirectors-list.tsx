"use client";

import { useUser } from "@/application/states/user-store";
import { api } from "@/config";
import { BiError } from "react-icons/bi";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { Redirector as RedirectorProps } from "@/domain/@types";
import { Redirector } from "./redirector";

export function RedirectorsList() {
  const user = useUser((state) => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const { data, isLoading, isError } = useQuery(["redirectors", resourcesId], {
    queryFn: async () => {
      const response = await api.get(`/resources/${resourcesId}/redirectors`);
      return response.data;
    },
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5
  });

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
    <div className="grid 2xl:grid-cols-2 my-6 gap-y-4 gap-x-4">
      {
        data.map((redirector: RedirectorProps, index: number) => {
          return (
            <Redirector.Root key={index}>
              <Redirector.Header redirector={redirector}>
                <Redirector.Actions redirector={redirector} />
              </Redirector.Header>
              <Redirector.Info redirector={redirector} />
            </Redirector.Root>
          );
        })
      }
    </div>
  );
}