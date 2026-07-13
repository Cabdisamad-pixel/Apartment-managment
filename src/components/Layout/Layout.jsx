import { Outlet } from "react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = () => {


    return (
        <>

            <div className="w-full flex justify-start items-start min-h-screen relative ">
                <Sidebar />
                <div className="w-[79%] overflow-scroll flex flex-col min-h-screen absolute right-0 top-0">
                    <Header />
                    <div className="w-full h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout