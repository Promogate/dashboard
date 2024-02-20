import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  user_profile: {
    id: string;
    store_image: string;
    store_name: string;
    store_name_display: string;
    lomadee_source_id: string | null;
    admitad_verification: string | null;
    payment_customer_id: string | null;
    resources: {
      id: string;
    };
    role: string;
    user_id: string;
    social_media: any | null;
  } | null;
  agree_with_policies: boolean
}

type State = {
  user: User | null;
}

type Actions = {
  setUser: (input: User | null) => void;
  removeUser: () => void
}

const userCreator: StateCreator<State & Actions, [["zustand/persist", unknown]]> = (set) =>({
  user: null,
  setUser: (input: User | null) => set({ user: input }),
  removeUser: () => set({ user: null }),
});

export const useUser = create<State & Actions>()(persist(
  userCreator, {
    name: "user-store",
    storage: createJSONStorage(() => localStorage)
  }
));