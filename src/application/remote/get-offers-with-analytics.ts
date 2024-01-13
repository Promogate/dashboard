import { api } from "@/config";
import { OfferWithClicks } from "@/domain/models";
import { getCookies } from "cookies-next";

export async function getOffersWithAnalytics (): Promise<OfferWithClicks[]> {
  const cookies = getCookies();

  const { data } = await api.get<OfferWithClicks[]>("/dashboard/analytics/offers/clicks", {
    headers: {
      Authorization: `Bearer ${cookies["promogate.token"]}`
    }
  });

  return data;
}