import StatusBadge from './StatusBadge.jsx';

function InvoiceTable({ invoices, onMarkPaid, onDeleteInvoice }) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Resident</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="text-slate-700">
                <td className="px-6 py-4 font-mono text-sm">{invoice.id}</td>
                <td className="px-6 py-4 font-medium">{invoice.resident}</td>
                <td className="px-6 py-4">{invoice.description}</td>
                <td className="px-6 py-4">{invoice.dueDate}</td>
                <td className="px-6 py-4 font-semibold">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {invoice.status !== 'Paid' && (
                      <button
                        onClick={() => onMarkPaid(invoice.id)}
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                      >
                        Mark Paid
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteInvoice(invoice.id)}
                      className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-slate-500">{invoice.id}</p>
                <h3 className="font-bold text-slate-900">{invoice.resident}</h3>
              </div>
              <StatusBadge status={invoice.status} />
            </div>

            <p className="text-slate-600">{invoice.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Due Date</p>
                <p className="font-semibold text-slate-700">{invoice.dueDate}</p>
              </div>
              <div>
                <p className="text-slate-400">Amount</p>
                <p className="font-semibold text-slate-700">${invoice.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {invoice.status !== 'Paid' && (
                <button
                  onClick={() => onMarkPaid(invoice.id)}
                  className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                >
                  Mark Paid
                </button>
              )}
              <button
                onClick={() => onDeleteInvoice(invoice.id)}
                className="flex-1 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoiceTable;
