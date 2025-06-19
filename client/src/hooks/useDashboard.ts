import { useEffect, useState } from "react";
import { api } from "./api";
import { usePassengerSlice } from "../store/dashboardSlice";

export const useGetPassengers = (onMount = true) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const { setPassenger, passengers } = usePassengerSlice();

  const getPassengers = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/api/dashboard/passengers");
      setPassenger(resp.data);
      setErr(true);
    } catch (error) {
      setErr(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (onMount) getPassengers();
  }, []);

  return { getPassengers, passengers, loading, err };
};
