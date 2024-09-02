import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div id="layout" className="flex items-start justify-between">
      <div className="w-full h-full">
        <Outlet />
        test
      </div>
    </div>
  );
};
