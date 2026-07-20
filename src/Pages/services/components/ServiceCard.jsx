import {
    FiCalendar,
    FiMapPin,
    FiMoreVertical
} from "react-icons/fi";

import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

const ServiceCard = ({ service }) => {

    return (

        <div
            className="
            bg-white
            rounded-2xl
            border
            border-slate-200
            p-6
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
        ">

            <div className="flex justify-between">

                <div>

                    <p className="text-sm text-gray-500">

                        {service.id}

                    </p>

                    <h3 className="font-bold text-xl mt-1">

                        {service.title}

                    </h3>

                </div>

                <button>

                    <FiMoreVertical
                        size={20}
                        className="text-gray-500"
                    />

                </button>

            </div>

            <div className="mt-4">

                <PriorityBadge
                    priority={service.priority}
                />

            </div>

            <p className="mt-4 text-gray-500 leading-7">

                {service.description}

            </p>

            <div className="flex items-center gap-2 mt-5">

                <FiMapPin />

                <span className="text-gray-600">

                    {service.apartment}

                </span>

            </div>

            <div className="flex items-center gap-2 mt-3">

                <FiCalendar />

                <span className="text-gray-600">

                    {service.createdAt}

                </span>

            </div>

            <div className="mt-6">

                <StatusBadge
                    status={service.status}
                />

            </div>

        </div>

    );

};

export default ServiceCard;