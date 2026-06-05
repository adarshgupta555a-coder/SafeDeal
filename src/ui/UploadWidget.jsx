import { useRef } from "react";
import Label from "./Label";

export default function UploadField({ label, accept = "image/*", value, onChange, uploading }) {
  const ref = useRef();
  return (
    <div>
      <Label>{label}</Label>
      <div
        onClick={() => ref.current?.click()}
        className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-lg p-4 flex flex-col items-center cursor-pointer transition group"
      >
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={onChange} />
        {value ? (
          value.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={value} className="h-24 rounded" controls />
          ) : (
            <img src={value} alt="" className="h-24 object-cover rounded" />
          )
        ) : (
          <>
            <svg className="w-8 h-8 text-slate-600 group-hover:text-amber-500 transition mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-slate-500 group-hover:text-slate-400">Click to upload</span>
          </>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-[#0a0f1e]/70 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
} 