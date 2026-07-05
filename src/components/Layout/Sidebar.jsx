import { NavLink } from "react-router";



function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'Apartments', icon: '▥' },
    { name: 'Residents', icon: '👥' },
    { name: 'Services', icon: '🔧' },
    { name: 'Billing', icon: '💳' },
    { name: 'Reports', icon: '📄' },
    { name: 'Settings', icon: '⚙' },
  ];

  return (
    <aside className="basis-[20%] bg-slate-950 text-slate-300 md:min-h-screen md:w-64">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
          ▦
        </div>
        <h1 className="text-lg font-bold text-white">ABMS Enterprise</h1>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-3 py-4 md:block md:space-y-2 md:overflow-visible">
        {menuItems.map((item) => {
          const active = item.name === 'Billing';

          return (
            <NavLink
              to={item.name.toLowerCase()}
              key={item.name}
              className={
               ( {isActive}) => isActive 
                  ? 'flex min-w-fit items-center gap-3 rounded-xl bg-emerald-500/15 px-4 py-3 text-emerald-400 md:w-full'
                  : 'flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-900 md:w-full'
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              {active && <span className="ml-auto hidden md:inline">›</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto hidden border-t border-slate-800 px-5 py-5 md:block">
        <button className="flex items-center gap-3 text-slate-400">
          <span>☰</span>
          <span>Collapse Menu</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
