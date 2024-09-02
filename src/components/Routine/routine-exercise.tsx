import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Exercise {
  id: number;
  name: string;
  description: string;
}

interface RoutineExercise {
  id: number;
  numSeries: number;
  numRep: number;
  rir: number;
  exercise: Exercise;
  session: string;
}

interface Routine {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  routineExercise: RoutineExercise[];
}

export const RoutineExercise = ({ routineId }: { routineId: number }) => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const apiRoutine = `http://localhost:8080/api/gym/routines/${routineId}`;
  const token = localStorage.getItem("token");
  const [sessionA, setSessionA] = useState<RoutineExercise[]>([]);
  const [sessionB, setSessionB] = useState<RoutineExercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiRoutine, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoutine(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [routineId, token]);

  useEffect(() => {
    if (routine) {
      asignSession(routine);
    }
  }, [routine]);

  const asignSession = (routine: Routine) => {
    const sessionAExercises: RoutineExercise[] = [];
    const sessionBExercises: RoutineExercise[] = [];

    routine.routineExercise.forEach((re) => {
      if (re.session.toLowerCase() === "a") {
        sessionAExercises.push(re);
      } else if (re.session.toLowerCase() === "b") {
        sessionBExercises.push(re);
      }
    });

    setSessionA(sessionAExercises);
    setSessionB(sessionBExercises);
  };

  return (
    <>
      {routine ? (
        <>
          <h1 className="font-bold text-3xl text-center">{routine.name}</h1>
          <div className="flex justify-evenly gap-10 mt-10">
            <div className="flex flex-col mx-auto items-center gap-5">
              <h2 className="font-bold text-xl">Session A</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>RIR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionA.map((re) => (
                    <TableRow key={re.id}>
                      <TableCell className="font-medium">
                        {re.exercise.name}
                      </TableCell>
                      <TableCell>{re.numSeries}</TableCell>
                      <TableCell>{re.numRep}</TableCell>
                      <TableCell>{re.rir}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col mx-auto items-center gap-5">
              <h2 className="font-bold text-xl">Session B</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>RIR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionB.map((re) => (
                    <TableRow key={re.id}>
                      <TableCell className="font-medium">
                        {re.exercise.name}
                      </TableCell>
                      <TableCell>{re.numSeries}</TableCell>
                      <TableCell>{re.numRep}</TableCell>
                      <TableCell>{re.rir}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
