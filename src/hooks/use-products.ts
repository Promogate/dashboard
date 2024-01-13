import { queryClient } from "@/app/providers";
import { useUser } from "@/application/states/user-store";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { OffersResponse, SetShowcaseProductInput } from "@/domain/@types";
import { useMutation, useQuery } from "react-query";

async function setShowcaseProduct(input: SetShowcaseProductInput): Promise<void> {
  await api.put(`/resources/offer/${input.offerId}/update/showcase`, {
    is_on_showcase: input.isOnShowcase
  });
}

async function getProducts(resourcesId: string): Promise<OffersResponse> {
  const { data } = await api.get(`/resources/${resourcesId}/offers`);

  return data;
}

export function useProductsHook() {
  const { toast } = useToast();
  const user = useUser((state) => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;

  return {
    useProducts: () => useQuery(["products", resourcesId], {
      queryFn: async () => await getProducts(resourcesId),
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }),
    useSetShowcaseProduct: () => useMutation({
      mutationFn: async (input: SetShowcaseProductInput) => await setShowcaseProduct(input),
      onSuccess: () => {
        queryClient.refetchQueries(["products", resourcesId]);
      },
      onError: (error: any) => {
        toast({
          title: "Ops! algo deu errado",
          description: error.response.data.message,
          variant: "destructive"
        });
      }
    })
  };
}