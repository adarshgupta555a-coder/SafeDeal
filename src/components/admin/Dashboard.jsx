import { useEffect, useState } from "react";
import Badge from "../../ui/Badge";
import PropertiesSection from "./PropertiesSection";
import LocationsSection from "./LocationSection";
import supabase from "../../database/supabase";

const NAV = [
  { id: "properties", label: "Properties", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { id: "locations", label: "Locations", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> },
];




export default function Dashboard({ onLogout }) {
  const [active, setActive] = useState("properties");
  const [locations, setLocations] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="px-5 py-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
          <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-tight">Estate<span className="text-amber-400">Admin</span></p>
          <p className="text-slate-600 text-xs">Property Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(n => (
          <button key={n.id} onClick={() => { setActive(n.id); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active === n.id ? "bg-amber-500 text-slate-900" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">{n.icon}</svg>
            {n.label}
            {n.id === "locations" && <Badge color="blue">{locations?.length}</Badge>}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Sign Out
        </button>
      </div>
    </>
  );

  useEffect(() => {
    getAllLocation()
  }, [])

  const getAllLocation = async () => {
    const { data: location, error } = await supabase
      .from('location')
      .select('*')

      if (!error) {
        setLocations(location)
      }
  }

  return (
    <div className="min-h-screen bg-[#070c18] flex">
      {/* desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#0a0f1e] border-r border-slate-800 fixed top-0 bottom-0 left-0">
        <SidebarContent />
      </aside>

      {/* mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-[#0a0f1e] border-r border-slate-800 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* main */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* topbar */}
        <header className="sticky top-0 z-30 bg-[#070c18]/90 backdrop-blur border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center gap-4">
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileOpen(true)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-white font-bold text-lg flex-1 capitalize">{active}</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-500 hidden sm:block">rakesh@estate.com</span>
          </div>
        </header>

        {/* content */}
        <main className="flex-1 p-4 sm:p-6">
          {active === "properties" && <PropertiesSection locations={locations} />}
          {active === "locations" && <LocationsSection locations={locations} setLocations={setLocations} />}
        </main>
      </div>
    </div>
  );
}