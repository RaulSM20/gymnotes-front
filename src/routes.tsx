import { RouteObject } from "react-router-dom";
import { Layout } from "./layout";
import { RegisterPage } from "./pages/register/RegisterPage";
import { HomePage } from "./pages/Home/HomePage";
import { RoutinePage } from "./pages/Routine/RoutinePage";
import { LoginPage } from "./pages/Login/LoginPage";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/Home",
        element: <HomePage />,
      },
      {
        path: "/routines/:id?",
        element: <RoutinePage />,
      },
    ],
  },
];
