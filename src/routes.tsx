import { RouteObject } from "react-router-dom";
import { Layout } from "./layout";
import { RegisterPage } from "./pages/register/RegisterPage";
import { HomePage } from "./pages/Home/HomePage";
import { RoutinePage } from "./pages/Routine/RoutinePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { MyRoutinePage } from "./pages/Routine/MyRoutinePage";
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/routines/:id?",
        element: <RoutinePage />,
      },
      {
        path: "/routines/myroutine",
        element: <MyRoutinePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
