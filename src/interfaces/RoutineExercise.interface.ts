import { Exercise } from "./Exercise.interface";

export interface RoutineExercise {
  id: number;
  numSeries: number;
  numRep: number;
  rir: number;
  exercise: Exercise;
  session: string;
}
