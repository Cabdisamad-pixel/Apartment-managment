
import { useEffect, useState } from 'react';

import PageTitle from '../../Pages/Billing/PageTitle';
import StatCard from '../../Pages/Billing/StatCard';
import SearchInvoice from '../../Pages/Billing/SearchInvoice';
import InvoiceTable from '../../Pages/Billing/InvoiceTable';
import InvoiceModal from '../../Pages/Billing/InvoiceModal';

import { firstInvoices } from '../../data.js';


function Billing() {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('abms_invoices');

    if (savedInvoices) {
      return JSON.parse(savedInvoices);
    }

    return firstInvoices;
  });

  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    localStorage.setItem('abms_invoices', JSON.stringify(invoices));
  }, [invoices]);

  function getInvoiceStatus(dueDate) {
    const today = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
      return 'Overdue';
    }

    return 'Unpaid';
  }

  function createInvoice(newInvoice) {
    const invoice = {
      id: 'inv-' + Date.now().toString().slice(-5),
      resident: newInvoice.resident,
      description: newInvoice.description,
      dueDate: newInvoice.dueDate,
      amount: newInvoice.amount,
      status: getInvoiceStatus(newInvoice.dueDate),
    };

    setInvoices([invoice, ...invoices]);
    setShowModal(false);
  }

  function markAsPaid(id) {
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === id) {
        return { ...invoice, status: 'Paid' };
      }

      return invoice;
    });

    setInvoices(updatedInvoices);
  }

  function deleteInvoice(id) {
    const remainingInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(remainingInvoices);
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const text = searchText.toLowerCase();

    return (
      invoice.resident.toLowerCase().includes(text) ||
      invoice.description.toLowerCase().includes(text) ||
      invoice.id.toLowerCase().includes(text)
    );
  });

  const collectedAmount = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((total, invoice) => total + invoice.amount, 0);

  const pendingAmount = invoices
    .filter((invoice) => invoice.status === 'Unpaid')
    .reduce((total, invoice) => total + invoice.amount, 0);

  const overdueAmount = invoices
    .filter((invoice) => invoice.status === 'Overdue')
    .reduce((total, invoice) => total + invoice.amount, 0);

  return (

    <div>
        <section className="p-5 md:p-8">
          <PageTitle onOpenModal={() => setShowModal(true)} />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StatCard
              title="Collected this month"
              amount={collectedAmount}
              icon="✓"
              color="bg-emerald-100 text-emerald-600"
            />
            <StatCard
              title="Pending Payments"
              amount={pendingAmount}
              icon="▣"
              color="bg-yellow-100 text-yellow-600"
            />
            <StatCard
              title="Overdue"
              amount={overdueAmount}
              icon="!"
              color="bg-rose-100 text-rose-600"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recent Invoices</h2>
              <SearchInvoice searchText={searchText} setSearchText={setSearchText} />
            </div>

            <InvoiceTable
              invoices={filteredInvoices}
              onMarkPaid={markAsPaid}
              onDeleteInvoice={deleteInvoice}
            />
          </div>
        </section>

      {showModal && (
        <InvoiceModal
          onClose={() => setShowModal(false)}
          onCreateInvoice={createInvoice}
        />
      )} 
    </div>
  );
}

export default Billing;
