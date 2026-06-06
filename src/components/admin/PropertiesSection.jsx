import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import Btn from "../../ui/Btn";
import SlideOver from "./SlideOverModal";
import PropertyForm from "./PropertyForm";
import DeleteModal from "./DeleteConfirmModel";
import Badge from "../../ui/Badge";
import supabase from "../../database/supabase";

export default function PropertiesSection({ locations }) {
  const [properties, setProperties] = useState([]);
  const [slide, setSlide] = useState(null); // null | "create" | {prop}
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");

  const save = (p) => {
    setProperties(prev => p.id && prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
    setSlide(null);
  };

  const filtered = properties.filter(p =>
       p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.name.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    getAllProperties()
  }, [])

  const getAllProperties = async () => {

    const { data, error } = await supabase
      .from('properties')
      .select(`
        * ,
        location (
        id,
        name
        )
        `)

    if (!error) {
      setProperties(data)
    }
  }

  const DeleteProperty = async () => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', deleting.id)
    if (!error) {
      setProperties(ps => ps.filter(x => x.id !== deleting.id)); 
      setDeleting(null); 
    }

  }

  if (properties.length === 0) {
    return <h1 className="text-4xl text-center">Loading...</h1>
  }

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" /></svg>
          <Input placeholder="Search properties…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Btn onClick={() => setSlide("create")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Property
        </Btn>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <p className="text-sm">No properties yet. Click <strong className="text-amber-400">Add Property</strong> to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-[#0d1526] border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition group">
              <div className="h-36 bg-slate-800 relative overflow-hidden">
                {p.thumbnail_image
                  ? <img src={p.thumbnail_image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  : <div className="w-full h-full flex items-center justify-center text-slate-600">No image</div>}
                <div className="absolute top-2 right-2"><Badge color="amber">{p.location.name || "—"}</Badge></div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white truncate mb-2">{p.name}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mb-4">
                  {p.overview.bedroom && <span>🛏 {p.overview.bedroom} bed</span>}
                  {p.overview.bathroom && <span>🚿 {p.overview.bathroom} bath</span>}
                  {p.overview.sq_foot && <span>📐 {p.overview.sq_foot} sqft</span>}
                </div>
                <div className="flex gap-2">
                  <Btn variant="ghost" className="flex-1 justify-center text-xs py-1.5" onClick={() => setSlide(p)}>Edit</Btn>
                  <Btn variant="danger" className="flex-1 justify-center text-xs py-1.5" onClick={() => setDeleting(p)}>Delete</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {slide && (
        <SlideOver title={slide === "create" ? "Add Property" : `Edit — ${slide.name}`} onClose={() => setSlide(null)}>
          <PropertyForm initial={slide === "create" ? null : slide} locations={locations} onSave={save} onCancel={() => setSlide(null)} />
        </SlideOver>
      )}

      {deleting && (
        <DeleteModal name={deleting.name} onCancel={() => setDeleting(null)}
          onConfirm={DeleteProperty} />
      )}
    </div>
  );
}