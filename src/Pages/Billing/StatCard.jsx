function StatCard({ title, amount, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">${amount.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default StatCard;
