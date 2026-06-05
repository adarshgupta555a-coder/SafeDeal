const Btn = ({ variant = "primary", className = "", children, ...p }) => {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f1e]";
  const styles = {
    primary: "bg-amber-500 hover:bg-amber-400 text-slate-900 focus:ring-amber-500",
    ghost: "bg-slate-800 hover:bg-slate-700 text-slate-300 focus:ring-slate-600",
    danger: "bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/40 focus:ring-red-600",
    outline: "border border-amber-500/40 hover:border-amber-500 text-amber-400 hover:bg-amber-500/10 focus:ring-amber-500",
  };
  console.log({...p})
    /*
  className = "mt-4"

p = {
  type: "submit",
  onClick: onCancel(),
}
  */
  return (
    <button {...p} className={`${base} ${styles[variant]} ${className} disabled:opacity-40 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
};

export default Btn;