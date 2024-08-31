import axios from "axios";
import { useEffect, useState } from "react";

export const UserItem = () => {
  interface User {
    username: string;
    country: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const apiUsers = "http://localhost:8080/api/user/users";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUsers, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {user ? (
        <div className="flex items-center justify-evenly gap-2 border rounded-xl p-2">
          <div className="avatar rounded-full min-h-12 min-w-12 bg-emerald-300 text-white font-[700] flex items-center justify-center">
            <p>RS</p>
          </div>
          <div>
            <p className="font-bold">{user.username}</p>
            <p className="text-neutral-400">{user.country}</p>
          </div>
        </div>
      ) : (
        <p>no hay usuario logeado</p>
      )}
    </>
  );
};
