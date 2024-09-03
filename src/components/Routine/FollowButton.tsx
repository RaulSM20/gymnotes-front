import axios from "axios";
import { Button } from "../ui/button";

interface followButtonProps {
  routineid: number;
  userid: number;
}

export const FollowButton: React.FC<followButtonProps> = ({
  routineid,
  userid,
}) => {
  const followRoutine = () => {
    const apiRoutine = `http://localhost:8080/api/user/${userid}/routines/${routineid}`;
    const token = localStorage.getItem("token");

    axios
      .post(
        apiRoutine,
        {}, // Cuerpo de la solicitud, si es necesario, actualmente está vacío
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Routine followed successfully!");
      })
      .catch((e) => {
        console.error("Error " + e);
        alert("Failed to follow");
      });
  };

  return <Button onClick={followRoutine}>Follow Routine</Button>;
};
