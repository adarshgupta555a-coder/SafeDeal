import { useState } from "react";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Btn from "../../ui/Btn";

const DUMMY_CREDENTIALS = { email: "rakesh@estate.com", password: "Rakesh@837" };

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    await new Promise((r) => setTimeout(r, 700));
    if (form.email === DUMMY_CREDENTIALS.email && form.password === DUMMY_CREDENTIALS.password) {
      onLogin();
    } else {
      setErr("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4">
      {/* background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #1e293b22 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, #92400e18, transparent)" }} />

      <div className="relative w-full max-w-md">
        {/* logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 mb-4 shadow-lg shadow-amber-500/30">
            <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Estate<span className="text-amber-400">Admin</span></h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage your properties</p>
        </div>

        <div className="bg-[#0d1526] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handle} className="space-y-5">
            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="admin@estate.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input type={show ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required className="pr-10" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {show ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            {err && <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{err}</p>}
            <Btn type="submit" className="w-full justify-center py-2.5" disabled={loading}>
              {loading ? <><div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> Signing in…</> : "Sign In"}
            </Btn>
          </form>
          <p className="mt-4 text-center text-xs text-slate-600"></p>
        </div>
      </div>
    </div>
  );
}
