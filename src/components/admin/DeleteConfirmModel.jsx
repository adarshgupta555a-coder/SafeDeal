import Btn from "../../ui/Btn";

export default function DeleteModal({ name, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#0d1526] border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4 mx-auto">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-center text-white font-semibold mb-1">Delete "{name}"?</h3>
        <p className="text-center text-slate-500 text-sm mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <Btn variant="ghost" className="flex-1 justify-center" onClick={onCancel}>Cancel</Btn>
          <Btn variant="danger" className="flex-1 justify-center" onClick={onConfirm}>Delete</Btn>
        </div>
      </div>
    </div>
  );
}
