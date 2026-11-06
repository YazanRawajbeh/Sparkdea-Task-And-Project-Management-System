import { Icon } from "../icon/Icon";
import { NavLink } from "react-router";

export function NavButton({ type, isActive: propIsActive, handler }) {
  const label = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  return (
    <NavLink
      to={"/" + type.toLowerCase()}
      onClick={handler}
      className={({ isActive }) => {
        const active = propIsActive !== undefined ? propIsActive : isActive;
        return `flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl shadow-xs cursor-pointer transition-all duration-150 ${
          active
            ? "bg-[#2563EB] text-white font-semibold"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium"
        }`;
      }}
    >
      <Icon name={type} />
      <span>{label}</span>
    </NavLink>
  );
}
