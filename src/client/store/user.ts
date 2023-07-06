import { User } from "@/interface/user.interface";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface UserStore extends User {
  setUser: (newUser: User) => void;
  isLogged: boolean;
  clear: () => void;
}

const initialState: Omit<UserStore, "setUser" | "clear"> = {
  displayName: "",
  email: "",
  isLogged: false,
  photoURL: "",
};

export const userStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
      setUser: (newUser: User) =>
        set((state) => ({ ...state, ...newUser, isLogged: true })),
      clear: () => set(() => initialState),
    }),
    {
      name: "@user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
