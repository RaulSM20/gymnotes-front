import { Routine } from "@/interfaces/Routine.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export const useRoutines = () => {
  const apiRoutines = "http://localhost:8080/api/gym/routines";

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useUser();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(apiRoutines, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoutines(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { routines, refetch: fetchData, isLoading };
};
