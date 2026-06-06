import { useState } from "react";
import Btn from "../../ui/Btn";
import DeleteModal from "./DeleteConfirmModel";
import LocationForm from "./LocationForm";
import SlideOver from "./SlideOverModal";
import supabase from "../../database/supabase";

export default function LocationsSection({ locations, setLocations }) {
  const [slide, setSlide] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const save = (l) => {
    setLocations(prev => l.id && prev.find(x => x.id === l.id) ? prev.map(x => x.id === l.id ? l : x) : [...prev, l]);
    setSlide(null);
  };

  const DeleteLocation = async () => {
    const { error } = await supabase
      .from('location')
      .delete()
      .eq('id', deleting.id)
      if (!error) {
          setLocations(ls => ls.filter(x => x.id !== deleting.id)); setDeleting(null);
      }
  }

  if (locations === null) {
    return <h1 className="text-4xl">Loading...</h1>
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Btn onClick={() => setSlide("create")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Location
        </Btn>
      </div>

      {locations.length === 0 ? (
        <div className="text-center py-16 text-slate-600 text-sm">No locations yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {locations.map(l => (
            <div key={l.id} className="bg-[#0d1526] border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition group">
              <div className="h-28 bg-slate-800 relative overflow-hidden">
                {l.image
                  ? <img src={l.image} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  : <div className="w-full h-full flex items-center justify-center text-slate-600 text-2xl">📍</div>}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white mb-1">{l.name}</h4>
                <p className="text-slate-500 text-xs line-clamp-2 mb-4">{l.description || "—"}</p>
                <div className="flex gap-2">
                  <Btn variant="ghost" className="flex-1 justify-center text-xs py-1.5" onClick={() => setSlide(l)}>Edit</Btn>
                  <Btn variant="danger" className="flex-1 justify-center text-xs py-1.5" onClick={() => setDeleting(l)}>Delete</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {slide && (
        <SlideOver title={slide === "create" ? "Add Location" : `Edit — ${slide.name}`} onClose={() => setSlide(null)}>
          <LocationForm initial={slide === "create" ? null : slide} onSave={save} onCancel={() => setSlide(null)} />
        </SlideOver>
      )}

      {deleting && (
        <DeleteModal name={deleting.name} onCancel={() => setDeleting(null)}
          onConfirm={DeleteLocation} />
      )}
    </div>
  );
}