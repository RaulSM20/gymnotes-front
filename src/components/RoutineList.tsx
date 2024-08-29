import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RoutineListProps {
  name: string;
  description: string;
  difficulty: string;
}

export const RoutineList: React.FC<RoutineListProps> = ({
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
        <CardFooter className="flex justify-center">
          <Button className="hover:bg-slate-800">Enter</Button>
        </CardFooter>
      </Card>
    </>
  );
};
