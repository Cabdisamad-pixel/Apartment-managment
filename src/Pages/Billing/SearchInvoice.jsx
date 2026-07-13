function SearchInvoice({ searchText, setSearchText }) {
  return (
    <div className="relative w-full md:w-80">
      <span className="absolute left-4 top-2.5 text-slate-400">⌕</span>
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search invoices..."
        className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

export default SearchInvoice;
