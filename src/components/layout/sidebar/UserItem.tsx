export const UserItem = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <>
      {user ? (
        <div className="flex items-center justify-evenly gap-2 border rounded-xl p-2">
          <div className="avatar rounded-full min-h-12 min-w-12 bg-emerald-300 text-white font-[700] flex items-center justify-center">
            <p>RS</p>
          </div>
          <div>
            <p className="font-bold">{user.username}</p>
          </div>
        </div>
      ) : (
        <p>no hay usuario logeado</p>
      )}
    </>
  );
};
