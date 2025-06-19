import { create } from "zustand";

type TPassenger = {
  _id: string;
  in: number;
  out: number;
  inFrame: number;
};

interface TPassengerSlice {
  passengers: TPassenger[];
  setPassenger: any;
}

export const usePassengerSlice = create<TPassengerSlice>((set) => ({
  passengers: [],
  setPassenger: (fn: any) =>
    set((state: any) => ({
      passengers: typeof fn === "function" ? fn(state.passengers) : fn,
    })),
}));
