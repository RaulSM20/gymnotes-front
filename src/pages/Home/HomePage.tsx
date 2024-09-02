import axios from "axios";

import { useEffect, useState } from "react";
import { RoutineList } from "../../components/Routine/RoutineList";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";

interface Routine {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

export const HomePage = () => {
  const apiRoutines = "http://localhost:8080/api/gym/routines";

  const [routines, setRoutines] = useState<Routine[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiRoutines, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoutines(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  console.log(routines);

  return (
    <>
      <div id="layout" className="flex items-start justify-between">
        <Sidebar />
        <div className="w-full h-full">
          <div className="grid grid-cols-5 gap-5 w-11/12 h-[760px] ml-5 mt-5">
            <div className="border-gray-400 rounded border-2 col-span-5">
              <h1 className="text-3xl font-bold m-5">Routines</h1>
              <div className="p-10 w-full grid grid-cols-3 gap-14 text-center "></div>
              <div className=" ml-5 flex gap-14">
                {routines.map((routine) => (
                  <RoutineList
                    key={routine.id}
                    id={routine.id}
                    name={routine.name}
                    description={routine.description}
                    difficulty={routine.difficulty}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
