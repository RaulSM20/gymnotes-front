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
import { FollowButton } from "./FollowButton";
import { useUser } from "@/hooks/useUser";
import { Routine } from "@/interfaces/Routine.interface";
import { RoutineExercise as IRoutineExercise } from "@/interfaces/RoutineExercise.interface";

export const RoutineExercise = ({ routineId }: { routineId: number }) => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [sessionA, setSessionA] = useState<IRoutineExercise[]>([]);
  const [sessionB, setSessionB] = useState<IRoutineExercise[]>([]);
  const apiRoutine = `http://localhost:8080/api/gym/routines/${routineId}`;

  const { token, user } = useUser();

  const [isFollowed, setIsFollowed] = useState<boolean>(false);

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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineId, token]);

  useEffect(() => {
    if (routine) {
      asignSession(routine);
    }
  }, [routine]);

  const asignSession = (routine: Routine) => {
    const sessionAExercises: IRoutineExercise[] = [];
    const sessionBExercises: IRoutineExercise[] = [];

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

  useEffect(() => {
    console.log("routine changed");
    setIsFollowed(routine?.users.some((u) => u.id === user.id) ?? false);
  }, [routine]);

  const onRoutineFollowed = () => {
    fetchData();
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
          {isFollowed ? (
            <p>You are following this routine</p>
          ) : (
            <FollowButton
              routineid={routine.id}
              userid={user.id}
              onFollowed={onRoutineFollowed}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
