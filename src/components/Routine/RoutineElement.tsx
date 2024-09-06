import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RoutineElementProps {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

export const RoutineElement: React.FC<RoutineElementProps> = ({
  id,
  name,
  description,
  difficulty,
}) => {
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{difficulty}</CardContent>
        <CardFooter className="flex justify-center align-bottom">
          <Link to={`/routines/${id}`}>
            <Button className=" bg-black hover:bg-slate-800">Enter</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
