import { api } from "@/config";
import { OfferWithClicks } from "@/domain/models";
import { parseCookies } from "nookies";

export async function getOffersWithAnalytics (): Promise<OfferWithClicks[]> {
  const cookies = parseCookies();

  const { data } = await api.get<OfferWithClicks[]>("/dashboard/analytics/offers/clicks", {
    headers: {
      Authorization: `Bearer ${cookies["promogate.token"]}`
    }
  });

  return data;
}