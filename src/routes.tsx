import { RouteObject } from "react-router-dom";
import { Layout } from "./layout";
import App from "./App";
import { RegisterPage } from "./pages/register/RegisterPage";
import { HomePage } from "./pages/Home/HomePage";
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/Home",
                element: <HomePage/>
            },

        ]
    }
]