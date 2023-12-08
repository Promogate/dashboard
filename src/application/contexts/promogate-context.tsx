"use client";

import { api } from "@/config";
import { SocialSoulOfferDataInput } from "@/domain/@types";
import { DashboardData, OfferDataInput, OfferWithClicks, RequestError } from "@/domain/models";
import { parseBRLCurrencytoInteger } from "@/main/utils";
import { AxiosError } from "axios";
import { getCookies } from "cookies-next";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ReactNode, createContext } from "react";
import { useRecoilState } from "recoil";
import { featuredOffersState } from "../atoms/featured-atom";

type CreateProfileInput = {
  store_name: string;
  store_name_display: string;
  store_image: string;
  user_id: string
}

type CreateProfileOutput = {
  profile: string;
}

export type FetchStoreOffersResponse = {
  status: string,
  message: string,
  data: {
    id: string,
    store_image: string,
    store_name: string,
    store_name_display: string,
    lomadee_source_id: string | null,
    admitad_verification: string | null,
    role: string,
    user_id: string,
    social_media: {
      facebook?: string;
      whatsapp?: string;
      instagram?: string;
      telegram?: string;
      twitter?: string;
    },
    resources: {
      offers: OfferWithClicks[]
    }
  },
  featured: OfferWithClicks[]
}

interface PromogateContextProps {
  createUserProfile(input: CreateProfileInput): Promise<void>;
  createOffer(input: OfferDataInput, userId: string): Promise<void>;
  createOfferFromSocialSoul(input: SocialSoulOfferDataInput, userId: string): Promise<void>;
  fetchDashboardData(profileId: string): Promise<DashboardData>;
  fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse>
  fetchUserData(): Promise<any>;
  fetchStoreData(storeName: string): Promise<any>;
  authorization: string;
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

/*eslint-disable react-hooks/exhaustive-deps*/
export function PromogateContextProvider({ children }: { children: ReactNode }) {
  const cookies = getCookies();
  const router = useRouter();
  const [_, setFeaturedOffersState]= useRecoilState(featuredOffersState);

  async function fetchDashboardData(profileId: string): Promise<DashboardData> {
    const { data } = await api.get<DashboardData>(`/analytics/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
    return data;
  }

  async function fetchUserData(): Promise<any> {
    const { data } = await api.get<{ clicks: number }>("/dashboard/analytics/clicks", {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });

    return data;
  }

  async function fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse> {
    const { data } = await api.get<FetchStoreOffersResponse>(`/resources/offers/${storeName}`);
    const featuredOffers = data.data.resources.offers.filter(offer => offer.is_featured);
    setFeaturedOffersState(featuredOffers);

    return {
      ...data,
      featured: featuredOffers
    };
  }

  async function createUserProfile(input: CreateProfileInput): Promise<void> {
    api.post<CreateProfileOutput>(`/users/${input.user_id}/profile/create`, {
      storeName: input.store_name,
      storeNameDisplay: input.store_name_display,
      storeImage: input.store_image
    }, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    }).then((fullfiled) => {
      const { data } = fullfiled;

      router.push("/dashboard");
    }).catch((err: AxiosError<RequestError>) => {
    });
  }

  async function fetchStoreData(storeName: string): Promise<any> {
    const { data } = await api.get(`/resources/store/${storeName}`);
    return data;
  }

  async function createOffer(input: OfferDataInput, userId: string): Promise<void> {
    const old_price = parseBRLCurrencytoInteger(input.oldPrice);
    const price = parseBRLCurrencytoInteger(input.price);
    await api.post(`/resources/${userId}/offer/create`, {
      ...input,
      old_price,
      price,
      expiration_date: dayjs().add(30, "days"),
    }, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
  }

  async function createOfferFromSocialSoul(input: SocialSoulOfferDataInput, resourceId: string): Promise<void> {
    await api.post(`/resources/${resourceId}/offer/create`, {
      ...input,
      price: input.price.toString(),
      old_price: input.old_price ? input.old_price.toString() : "",
      expiration_date: dayjs().add(30, "days"),
    }, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
  }

  return (
    <PromogateContext.Provider value={{
      fetchDashboardData,
      fetchUserData,
      createUserProfile,
      fetchStoreOffers,
      fetchStoreData,
      authorization: `Bearer ${cookies["promogate.token"]}`,
      createOffer,
      createOfferFromSocialSoul
    }}>
      {children}
    </PromogateContext.Provider>
  );
}