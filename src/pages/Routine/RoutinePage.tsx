import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { RoutineExercise } from "@/components/Routine/routine-exercise";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

export const RoutinePage = () => {
  const { id } = useParams();

  if (!id) return <p>No rutines</p>;

  return (
    <>
      <div id="layout" className="flex items-start justify-between"></div>
      <Sidebar />
      <div className="w-full h-full">
        <div>
          <Link to={"/home"}>
            <Button>Home</Button>
          </Link>

          <RoutineExercise routineId={parseInt(id)} />
        </div>
      </div>
    </>
  );
};
