function PageTitle({ onOpenModal }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-6 flex items-center gap-3 text-slate-500">
          <span>App</span>
          <span>›</span>
          <span className="font-semibold text-slate-700">Billing</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Billing & Payments</h1>
        <p className="mt-1 text-slate-500">Manage invoices and financial records</p>
      </div>

      <button
        onClick={onOpenModal}
        className="flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700"
      >
        <span>▣</span>
        <span>Create Invoice</span>
      </button>
    </div>
  );
}

export default PageTitle;
