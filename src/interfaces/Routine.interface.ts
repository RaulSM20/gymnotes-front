import { RoutineExercise } from "./RoutineExercise.interface";
import { User } from "./User.interface";

export interface Routine {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  routineExercise: RoutineExercise[];
  users: User[];
}
