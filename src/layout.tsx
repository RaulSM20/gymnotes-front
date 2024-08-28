import { Outlet } from "react-router-dom"

export const Layout = () => {

    return (
        <div id="layout">

            <header className="flex m-2">
                <h1 className="text-2xl text-black font-bold">Rsandez</h1>
            </header>
            <Outlet/>
        </div>
    )
}