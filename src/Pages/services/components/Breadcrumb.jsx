import { HiOutlineHome } from "react-icons/hi";

const Breadcrumb = () => {

    return (

        <div className="flex items-center gap-2 text-sm text-gray-500">

            <HiOutlineHome />

            <span>Dashboard</span>

            <span>/</span>

            <span className="text-gray-900 font-semibold">

                Services

            </span>

        </div>

    );

};

export default Breadcrumb;