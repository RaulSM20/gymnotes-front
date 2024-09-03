import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import { Sidebar } from "./components/layout/sidebar/Sidebar";

export const Layout = () => {
  return (
    <div id="layout" className="flex items-start justify-between">
      <Sidebar />
      <div className="grid w-full h-full pl-[300px]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
