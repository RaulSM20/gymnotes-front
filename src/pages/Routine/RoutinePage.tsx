import { RoutineExercise } from "@/components/Routine/routine-exercise";
import { useParams } from "react-router-dom";

export const RoutinePage = () => {
  const { id } = useParams();

  if (!id) return <p>No rutines</p>;

  return (
    <>
      <div className="flex items-start justify-between mt-4">
        <div className="w-full h-full">
          <div>
            <RoutineExercise routineId={parseInt(id)} />
          </div>
        </div>
      </div>
    </>
  );
};
