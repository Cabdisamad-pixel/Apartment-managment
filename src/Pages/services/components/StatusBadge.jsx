import {
    FiClock,
    FiCheckCircle,
    FiTool,
    FiXCircle
} from "react-icons/fi";

const config = {

    Pending: {
        color: "bg-yellow-100 text-yellow-700",
        icon: <FiClock size={14}/>
    },

    "In Progress": {
        color: "bg-blue-100 text-blue-700",
        icon: <FiTool size={14}/>
    },

    Completed: {
        color: "bg-emerald-100 text-emerald-700",
        icon: <FiCheckCircle size={14}/>
    },

    Cancelled: {
        color: "bg-red-100 text-red-700",
        icon: <FiXCircle size={14}/>
    }

};

const StatusBadge = ({ status }) => {

    return (

        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config[status].color}`}
        >

            {config[status].icon}

            {status}

        </span>

    );

};

export default StatusBadge;