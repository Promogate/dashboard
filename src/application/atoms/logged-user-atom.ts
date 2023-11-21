import { User } from "@/domain/@types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const key = "loggedUser";

const { persistAtom } = recoilPersist({
  key: key
});

export const loggedUser = atom<User | null>({
  key: key,
  default: null,
  effects_UNSTABLE: [persistAtom]
});