import { OfferWithClicks } from "@/domain/models";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const key = "featuredOffersState";

const { persistAtom } = recoilPersist({
  key: key
});

export const featuredOffersState = atom<OfferWithClicks[]>({
  key: key,
  default: [],
  effects_UNSTABLE: [persistAtom]
});