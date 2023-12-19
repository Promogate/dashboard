import { api } from "@/config";
import { useQuery } from "react-query";

async function getUserData(id: string): Promise<any> {
  const { data } = await api.get(`/users/me/${id}`);
  return data;
}

export const useRefreshUserData = (id: string) => {
  return useQuery({
    queryKey: ["userData", id],
    queryFn: async () => await getUserData(id),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    retry: 3
  });
};