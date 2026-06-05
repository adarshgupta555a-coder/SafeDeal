
const Badge = ({ children, color = "amber" }) => {
  const c = { amber: "bg-amber-500/20 text-amber-300", green: "bg-green-500/20 text-green-300", blue: "bg-blue-500/20 text-blue-300" };
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c[color]}`}>{children}</span>;
};
export default Badge;