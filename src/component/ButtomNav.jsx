import { NavButton } from "./NavButton";

export function ButtomNav() {
  return (
    <nav className="p-1.5 bg-white border border-gray-200/90 shadow-xs rounded-2xl flex items-center gap-1 -translate-y-2 transition-transform">
      <NavButton type="SPARK" />
      <NavButton type="PLAN" />
      <NavButton type="PROGRESS" />
    </nav>
  );
}
