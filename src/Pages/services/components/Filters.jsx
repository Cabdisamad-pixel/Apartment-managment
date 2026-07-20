import { FiSearch } from "react-icons/fi";

const Filters = ({
    search,
    setSearch,
    status,
    setStatus
}) => {

    return (

        <div className="flex gap-4">

            <div className="relative">

                <FiSearch
                    className="absolute left-4 top-4 text-gray-400"
                />

                <input

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    placeholder="Search services..."

                    className="pl-11 h-12 w-80 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"

                />

            </div>

            <select

                value={status}

                onChange={(e) => setStatus(e.target.value)}

                className="h-12 rounded-lg border px-4">

                <option>All</option>

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>

            </select>

        </div>

    );

};

export default Filters;