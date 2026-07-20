const colors = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[priority] || "bg-gray-100 text-gray-700"
      }`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;