import { useState } from 'react';

function InvoiceModal({ onClose, onCreateInvoice }) {
  const [resident, setResident] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('2026-07-10');

  function handleSubmit(event) {
    event.preventDefault();

    if (resident === '' || description === '' || amount === '' || dueDate === '') {
      alert('Please fill all fields');
      return;
    }

    onCreateInvoice({
      resident: resident,
      description: description,
      amount: Number(amount),
      dueDate: dueDate,
    });

    setResident('');
    setDescription('');
    setAmount('');
    setDueDate('2026-07-10');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-3xl font-bold text-slate-900">Create New Invoice</h2>
          <button onClick={onClose} className="text-3xl text-slate-400 hover:text-slate-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-lg font-medium text-slate-600">Resident Name</label>
            <input
              type="text"
              value={resident}
              onChange={(event) => setResident(event.target.value)}
              placeholder="e.g. John Doe"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-medium text-slate-600">Description</label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="e.g. Rent - November 2023"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-lg font-medium text-slate-600">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-medium text-slate-600">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-7 py-4 text-lg font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-emerald-600 px-7 py-4 text-lg font-semibold text-white shadow-md hover:bg-emerald-700"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceModal;
