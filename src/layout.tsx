import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div id="layout">
      <Outlet />
    </div>
  );
};
