



function Header() {

  

  return (
    <header className="flex flex-col gap-4 border-b max-w-full border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between md:px-5">
      <h2 className="text-2xl font-bold text-slate-900">Billing</h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <span className="absolute left-4 top-2.5 text-slate-400">⌕</span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-2xl bg-slate-100 py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 sm:w-72"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* <button className="relative text-xl text-slate-500">
            🔔
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button> */}

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-slate-900">Alice Administrator</p>
              <p className="text-sm text-slate-500">Admin</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
