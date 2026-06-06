import { useState } from "react";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Textarea from "../../ui/TextArea";
import UploadField from "../../ui/UploadWidget";
import Btn from "../../ui/Btn";
import supabase from "../../database/supabase";
import uploadToCloudinary from "../../utils/uploadToCloudinary";

const defaultLoc = () => ({ name: "", description: "", image: "" });

export default function LocationForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? defaultLoc());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      // const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzmSfDfPpr7MPkRgmtQUX_k4QRfHtipa9xw&s";
      setForm(f => ({ ...f, image: url }));
    } catch (error) {
      alert("Upload failed.");
      console.log(error)
    }
    finally { setUploading(false); }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    console.log(form)
    if (initial === null) {
      await submitProperty(form)
    } else {
      await UpdateProperty(form)
    }

  };

  const submitProperty = async (locationData) => {
    const { data, error } = await supabase
      .from('location')
      .insert([locationData])
      .select()

    if (!error) {
      onSave({ ...form, id: data.id ?? Date.now() });
      setSaving(false);
    }
  }

  const UpdateChecker = (locationData) => {
    const { created_at, id, ...locationInfo } = locationData;

    const checkedLocation = {};

    for (const key in locationInfo) {
      if (initial[key] !== locationInfo[key]) {
        checkedLocation[key] = locationInfo[key];
      }
    }
     return Object.keys(checkedLocation).length ? checkedLocation: null;

  };

  const UpdateProperty = async (locationData) => {
    const UpdatededData = UpdateChecker(locationData)
    console.log(UpdatededData)
    if (UpdatededData === null) {
    onSave({ ...form, id: form.id ?? Date.now() });
    setSaving(false);
    return;
    }

    const { data, error } = await supabase
      .from('location')
      .update(UpdatededData)
      .eq('id', initial.id)
      .select()

    if (!error) {
    const {created_at, id, ...loc} = form;
    onSave({ ...loc, id: initial.id ?? Date.now() });
    setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <Label>Location Name</Label>
        <Input placeholder="e.g. Beachfront" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea placeholder="Describe this location…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      </div>
      <UploadField label="Location Image" value={form.image} uploading={uploading}
        onChange={e => handleUpload(e.target.files[0])} />
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
        <Btn type="button" variant="ghost" onClick={onCancel}>Cancel</Btn>
        <Btn type="submit" disabled={saving || uploading}>
          {saving ? <><div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />Saving…</> : form.id ? "Update Location" : "Create Location"}
        </Btn>
      </div>
    </form>
  );
}