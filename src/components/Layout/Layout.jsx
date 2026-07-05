import { Outlet } from "react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = () => {


    return (
        <>

            <div className="w-full flex justify-start items-start min-h-screen ">
                <Sidebar />
                <div className="w-[80%] flex flex-col min-h-screen bg-slate-50">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout