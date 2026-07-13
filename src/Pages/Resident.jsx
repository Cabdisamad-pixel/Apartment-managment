import { useMemo, useState } from "react";

const initialResidents = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "555-0101", unit: "Unit 101", moveIn: "01/15/2023", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-0102", unit: "Unit 102", moveIn: "03/20/2023", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "555-0103", unit: "Unit 104", moveIn: "11/05/2022", status: "Active" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "555-0104", unit: "Unit 105", moveIn: "06/10/2023", status: "Active" },
];

const emptyForm = { name: "", email: "", phone: "", unit: "", moveIn: "", status: "Active" };

function todayFormatted() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${d.getFullYear()}`;
}

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6Z"></path>
      <path d="m22 6-10 7L2 6"></path>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
function PersonAddIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="17" y1="11" x2="23" y2="11"></line>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900";
const inputErrorClass =
  "w-full rounded-lg border border-red-400 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500";

function ResidentModal({ mode, initial, onCancel, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const isAdd = mode === "add";

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.phone.trim()) next.phone = "Phone is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            {isAdd ? "Add New Resident" : "Edit Resident"}
          </h2>
          <button
            onClick={onCancel}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={form.name}
              className={errors.name ? inputErrorClass : inputClass}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name}</span>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={form.email}
              className={errors.email ? inputErrorClass : inputClass}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Phone</label>
            <input
              type="text"
              placeholder="555-0100"
              value={form.phone}
              className={errors.phone ? inputErrorClass : inputClass}
              onChange={(e) => update("phone", e.target.value)}
            />
            {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Move In Date</label>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              value={form.moveIn}
              className={inputClass}
              onChange={(e) => update("moveIn", e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Status</label>
            <select
              value={form.status}
              className={inputClass}
              onChange={(e) => update("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            onClick={handleSubmit}
          >
            {isAdd ? "Add Resident" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Resident() {
  const [residents, setResidents] = useState(initialResidents);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [modal, setModal] = useState(null);

  const filtered = useMemo(() => {
    return residents.filter((r) => {
      const matchesQuery =
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [residents, query, statusFilter]);

  function openAdd() {
    setModal({ mode: "add", initial: { ...emptyForm, moveIn: todayFormatted() } });
  }

  function openEdit(resident) {
    setModal({
      mode: "edit",
      resident,
      initial: {
        name: resident.name,
        email: resident.email,
        phone: resident.phone,
        moveIn: resident.moveIn,
        status: resident.status,
      },
    });
  }

  function closeModal() {
    setModal(null);
  }

  function handleSubmit(form) {
    if (modal.mode === "add") {
      setResidents((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          email: form.email,
          phone: form.phone,
          unit: form.unit || "Unassigned",
          moveIn: form.moveIn || todayFormatted(),
          status: form.status,
        },
      ]);
    } else {
      setResidents((prev) =>
        prev.map((r) =>
          r.id === modal.resident.id
            ? { ...r, name: form.name, email: form.email, phone: form.phone, moveIn: form.moveIn, status: form.status }
            : r
        )
      );
    }
    closeModal();
  }

  function handleDelete(id) {
    setResidents((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="mx-auto w-full px-6 py-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Residents</h1>
          <p className="mt-1 text-gray-500">Directory of current tenants</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
          onClick={openAdd}
        >
          <PersonAddIcon /> Add Resident
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div className="relative w-full max-w-sm">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-gray-900 focus:bg-white"
            />
          </div>
          <button
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            onClick={() => setStatusFilter((prev) => (prev === "Active" ? "All" : "Active"))}
          >
            Status: {statusFilter}
            <ChevronDown />
          </button>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Name</th>
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Contact</th>
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Unit</th>
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Move In Date</th>
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Status</th>
              <th className="px-6 pb-3.5 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 font-semibold text-gray-900">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600">
                      {initials(r.name)}
                    </div>
                    {r.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <MailIcon /> {r.email}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-gray-400">
                    <PhoneIcon /> {r.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{r.unit}</td>
                <td className="px-6 py-4 text-gray-700">{r.moveIn}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      "inline-block rounded-full px-3 py-1 text-xs font-bold " +
                      (r.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500")
                    }
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                      title="Edit"
                      onClick={() => openEdit(r)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                      onClick={() => handleDelete(r.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-14 text-center text-gray-500">No residents match your search.</div>
        )}
      </div>

      {modal && (
        <ResidentModal
          mode={modal.mode}
          initial={modal.initial}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
