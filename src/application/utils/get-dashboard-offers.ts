import { api } from "@/config";
import { Offer } from "@/domain/models";

type Input = {
  authorization: string;
  page?: number;
  perPage?: number;
}

type Output = {
  page: number;
  per_page: number;
  total_offers: number;
  showcase_quantity: number;
  featured_quantity: number;
  offers: Offer[];
}

type RequestOutput = {
  page: number;
  per_page: number;
  total_offers: number;
  total_featured_offers: number;
  total_showcase_offers: number;
  offers: Offer[]
}

export async function getDashboardOffers({
  authorization,
  page = 1, 
  perPage = 10
}: Input): Promise<Output> {
  const { data } = await api.get<RequestOutput>(`/dashboard/offers/`, {
    params: {
      page,
      perPage
    },
    headers: {
      Authorization: authorization
    }
  });

  return {
    page: data.page,
    per_page: data.per_page,
    total_offers: data.total_offers,
    showcase_quantity: data.total_showcase_offers,
    featured_quantity: data.total_featured_offers,
    offers: data.offers,
  };
}