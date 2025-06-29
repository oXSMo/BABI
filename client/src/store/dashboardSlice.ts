import { create } from "zustand";

type TPassenger = {
  _id: string;
  in: number;
  out: number;
  inFrame: number;
};

export type TUsers = {
  admin: number;
  normal: number;
  worker: number;
};

type TInfo = {
  transactions: number;
  creditAdded: number;
  totalUsers: number;
};

type TSales = {
  _id: string;
  totalPrice: number;
};

interface TPassengerSlice {
  passengers: TPassenger[];
  setPassenger: any;
  info: TInfo;
  setInfo: any;
  users: TUsers;
  setUsers: any;
  sales: TSales[];
  setSales: any;
}

export const usePassengerSlice = create<TPassengerSlice>((set) => ({
  passengers: [],
  setPassenger: (fn: any) =>
    set((state: any) => ({
      passengers: typeof fn === "function" ? fn(state.passengers) : fn,
    })),
  info: { transactions: 0, creditAdded: 0, totalUsers: 0 },
  setInfo: (fn: any) =>
    set((state: any) => ({
      info: typeof fn === "function" ? fn(state.info) : fn,
    })),
  users: { admin: 0, normal: 0, worker: 0 },
  setUsers: (fn: any) =>
    set((state: any) => ({
      users: typeof fn === "function" ? fn(state.users) : fn,
    })),
  sales: [],
  setSales: (fn: any) =>
    set((state: any) => ({
      sales: typeof fn === "function" ? fn(state.sales) : fn,
    })),
}));

interface TUsersSlice {
  users: {
    _id: string;
    isAdmin: boolean;
    isVerified: boolean;
    email: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }[];
  setUsers: any;
}

export const useUsersSlice = create<TUsersSlice>((set) => ({
  users: [],
  setUsers: (fn: any) =>
    set((state: any) => ({
      users: typeof fn === "function" ? fn(state.users) : fn,
    })),
}));

type TTransactionProfile = {
  _id: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
};

interface TTransactionSlice {
  transactions: {
    _id: string;
    balance: number;
    worker: TTransactionProfile;
    client: TTransactionProfile;
    createdAt: string;
  }[];
  setTransactions: any;
}

export const useTransactionsSlice = create<TTransactionSlice>((set) => ({
  transactions: [],
  setTransactions: (fn: any) =>
    set((state: any) => ({
      transactions: typeof fn === "function" ? fn(state.transactions) : fn,
    })),
}));
