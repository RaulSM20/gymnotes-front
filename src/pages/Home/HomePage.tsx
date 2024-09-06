import { RoutineElement } from "@/components/Routine/RoutineElement";
import { Button } from "@/components/ui/button";
import { useRoutines } from "@/hooks/useRoutines";

export const HomePage = () => {
  const { routines, refetch, isLoading } = useRoutines();

  return (
    <>
      <div id="layout" className="flex items-start justify-between">
        <div className="w-full h-full">
          <div className="grid grid-cols-5 gap-5 w-11/12 h-[760px] m-3">
            <div className="border-gray-200 rounded border col-span-5">
              <h1 className="text-3xl font-bold m-5">Routines</h1>
              <div className="p-10 w-full grid grid-cols-3 gap-14 text-center "></div>
              <div className=" m-3 flex gap-14">
                {routines.map((routine) => (
                  <RoutineElement
                    key={routine.id}
                    id={routine.id}
                    name={routine.name}
                    description={routine.description}
                    difficulty={routine.difficulty}
                  />
                ))}
              </div>
              <Button onClick={refetch} disabled={isLoading}>
                {isLoading ? "Cargando..." : "Volver a cargar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
