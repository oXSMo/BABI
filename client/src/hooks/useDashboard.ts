import { useEffect, useState } from "react";
import { api } from "./api";
import {
  usePassengerSlice,
  useTransactionsSlice,
  useUsersSlice,
} from "../store/dashboardSlice";

export const useGetPassengers = (onMount = true) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const { setPassenger, passengers, info, setInfo, setUsers, users, setSales } =
    usePassengerSlice();

  const get = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/api/dashboard/info");
      setPassenger(resp.data.passengers);
      setInfo({
        transactions: resp.data.transactions,
        creditAdded: resp.data.creditAdded,
        totalUsers: resp.data.users[0].total,
      });
      setUsers(resp.data.users[0]);
      setSales(resp.data.sales);
      setErr(true);
    } catch (error) {
      setErr(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (onMount) get();
  }, []);

  return { get, passengers, info, users, loading, err };
};

export const useGetUsers = (onMount = true) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const { setUsers, users } = useUsersSlice();
  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/api/dashboard/users");
      setUsers(resp.data);
      setErr(false);
    } catch (error) {
      setErr(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onMount) getUsers();
  }, []);

  return { loading, err, getUsers, users };
};

export const useGetTransactions = (onMount = true) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const { setTransactions, transactions } = useTransactionsSlice();

  const getTransactions = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/api/dashboard/transactions");
      setTransactions(resp.data);
      setErr(false);
    } catch (error) {
      setErr(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onMount) getTransactions();
  }, []);

  return { loading, err, getTransactions, transactions };
};
