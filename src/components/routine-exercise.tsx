import axios from "axios";
import { useEffect, useState } from "react";

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

  return (
    <>
      {routine ? (
        <div>
          <h1>{routine.name}</h1>
          <p>{routine.description}</p>
          <p>{routine.id}</p>
          <h2>Exercises:</h2>
          <ul>
            {routine.routineExercise.map((re) => (
              <li key={re.id}>
                <p>Name: {re.exercise.name}</p>
                <p>Sets: {re.numSeries}</p>
                <p>Reps: {re.numRep}</p>
                <p>RIR: {re.rir}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
