import { Sidebar } from "./components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div id="layout" className="flex items-start justify-between">
      <Sidebar />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
