import { useCallback, useState } from "react";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import UploadField from "../../ui/UploadWidget";
import supabase from "../../database/supabase"
import Btn from "../../ui/Btn";

const defaultProp = () => ({
 name: "", location: "", thumbnail_image: "", graph_image: "",
  media_data: { video: "", image1: "", image2: "", image3: "", image4: "" },
  price: 0,
  overview: { bedroom: "", bathroom: "", sq_foot: "", year_built: "" },
  amenities: [],
});

export default function PropertyForm({ initial, locations, onSave, onCancel }) {
  const [form, setForm] = useState( initial? {   ...initial, location: initial.location?.id ?? initial.location}: defaultProp);
  const [uploading, setUploading] = useState({});
  const [amenityInput, setAmenityInput] = useState("");
  const [saving, setSaving] = useState(false);

  const setField = (path, val) => {
    setForm(prev => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let cur = next;
      keys.slice(0, -1).forEach(k => (cur = cur[k]));
      cur[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const handleUpload = useCallback(async (path, file) => {
    if (!file) return;
    setUploading(u => ({ ...u, [path]: true }));
    try {
      // const url = await uploadToCloudinary(file);
      const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzmSfDfPpr7MPkRgmtQUX_k4QRfHtipa9xw&s";
      setField(path, url);
    } catch {
      alert("Upload failed. Check Cloudinary config.");
    } finally {
      setUploading(u => ({ ...u, [path]: false }));
    }
  }, []);

  const addAmenity = () => {
    const v = amenityInput.trim();
    if (v && !form.amenities.includes(v)) {
      setForm(f => ({ ...f, amenities: [...f.amenities, v] }));
      setAmenityInput("");
    }
  };

  const removeAmenity = (a) => setForm(f => ({ ...f, amenities: f.amenities.filter(x => x !== a) }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (initial === null) {
      await submitProperty(form)
    } else {
            console.log("update")
      await UpdateProperty(form)
    }
    
  };

  const isUploading = Object.values(uploading).some(Boolean);

   const submitProperty = async (propertyData) => {
          console.log("create")
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
  
      if (!error) {
        onSave({ ...form, id: data.id ?? Date.now() });
        setSaving(false);
      }
    }

     const UpdateChecker = (propertyData) => {
    const { created_at, id, ...PropertyInfo } = propertyData;
      console.log(propertyData)
    const checkedProperty = {};

    for (const key in PropertyInfo) {
       if (propertyData[key] === "") {
         continue;
      }
      if (typeof propertyData[key] === "object") {
         checkedProperty[key] = PropertyInfo[key];
         continue;
      }

      if (initial[key] !== PropertyInfo[key]) {
        checkedProperty[key] = PropertyInfo[key];
      }
    }
     return Object.keys(checkedProperty).length ? checkedProperty: null;

  };

  const UpdateProperty = async (propertyData) => {
    const UpdatededData = UpdateChecker(propertyData)
    console.log(UpdatededData)
    if (UpdatededData === null) {
    // onSave({ ...form, id: form.id ?? Date.now() });
    setSaving(false);
    return;
    }

    const { data, error } = await supabase
      .from('properties')
      .update(UpdatededData)
      .eq('id', initial.id)
      .select()

    if (!error) {
    const {created_at, id, ...pro} = form;
    onSave({ ...pro, id: initial.id ?? Date.now() });
    setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Basic info */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-500" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Property Name</Label>
            <Input placeholder="e.g. Skyline Residency" value={form?.name} onChange={e => setField("name", e.target.value)} required />
          </div>
            <div>
            <Label>Price</Label>
            <Input placeholder="e.g. 900000" type="number" value={form?.price} onChange={e => setField("price", e.target.value)} required />
          </div>
          <div>
            <Label>Location</Label>
            <Select value={initial?.location?.id || form?.location} onChange={e => setField("location", e.target.value)} required>
              <option value="">{initial?.location?.name||"Select location…"}</option>
              {locations && locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </Select>
          </div>
        </div>
      </section>

      {/* Images */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-500" /> Thumbnail &amp; Graph
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UploadField label="Thumbnail Image" value={form?.thumbnail_image} uploading={uploading["thumbnail_image"]}
            onChange={e => handleUpload("thumbnail_image", e.target.files[0])} />
          <UploadField label="Graph Image" value={form?.graph_image} uploading={uploading["graph_image"]}
            onChange={e => handleUpload("graph_image", e.target.files[0])} />
        </div>
      </section>

      {/* Media */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-500" /> Media Gallery
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <UploadField label="Video" accept="video/*" value={form?.media_data?.video} uploading={uploading["media_data.video"]}
            onChange={e => handleUpload("media_data.video", e.target.files[0])} />
          {[1, 2, 3, 4].map(n => (
            <UploadField key={n} label={`Image ${n}`} value={form?.media_data[`image${n}`]} uploading={uploading[`media_data.image${n}`]}
              onChange={e => handleUpload(`media_data.image${n}`, e.target.files[0])} />
          ))}
        </div>
      </section>

      {/* Overview */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-500" /> Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[["bedroom", "Bedrooms"], ["bathroom", "Bathrooms"], ["sq_foot", "Sq. Foot"], ["year_built", "Year Built"]].map(([k, l]) => (
            <div key={k}>
              <Label>{l}</Label>
              <Input type="number" placeholder="0" value={form?.overview[k]} onChange={e => setField(`overview.${k}`, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-500" /> Amenities / Features
        </h3>
        <div className="flex gap-2 mb-3">
          <Input placeholder="e.g. Swimming Pool" value={amenityInput} onChange={e => setAmenityInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAmenity())} />
          <Btn type="button" variant="outline" onClick={addAmenity}>Add</Btn>
        </div>
        {form?.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form?.amenities?.map(a => (
              <span key={a} className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full px-3 py-1 text-xs font-medium">
                {a}
                <button type="button" onClick={() => removeAmenity(a)} className="hover:text-red-400 transition">✕</button>
              </span>
            ))}
          </div>
        )}
      </section>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
        <Btn type="button" variant="ghost" onClick={onCancel}>Cancel</Btn>
        <Btn type="submit" disabled={saving || isUploading}>
          {saving ? <><div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />Saving…</> : form?.id ? "Update Property" : "Create Property"}
        </Btn>
      </div>
    </form>
  );
}