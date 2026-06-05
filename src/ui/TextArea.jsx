const Textarea = ({ className = "", ...p }) => (
  <textarea
    {...p}
    rows={3}
    className={`w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition resize-none ${className}`}
  />
);

export default Textarea;