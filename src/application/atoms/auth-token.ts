import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const key = "authToken";

const { persistAtom } = recoilPersist({
  key: key
});

export const authToken = atom<string | null>({
  key: key,
  default: null,
  effects_UNSTABLE: [persistAtom]
});