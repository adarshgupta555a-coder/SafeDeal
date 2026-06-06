
const Badge = ({ children, color = "amber" }) => {
  const c = { amber: "bg-amber-500/20 text-sm text-red-500 font-bold", green: "bg-green-500/20 text-sm text-black font-bold", blue: "bg-blue-500/20 text-sm text-black font-bold" };
  return <span className={`inline-block rounded-full px-2 py-0.5 ${c[color]}`}>{children}</span>;
};
export default Badge;