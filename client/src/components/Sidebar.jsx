import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Route } from "lucide-react";
import logo from "../logo.png";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-navy-blue text-white flex flex-col">
      <div className="px-3 py-1 flex items-start justify-start">
        <img
          src={logo}
          alt="TaxiCoop"
          className="h-28 w-auto object-contain md:h-32"
        />
      </div>
      <nav className="flex flex-col px-4 pt-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center py-1 px-3 rounded-lg transition-colors ${isActive ? "bg-slate-gray" : "hover:bg-slate-gray/50"}`
          }
        >
          <LayoutDashboard className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/drivers"
          className={({ isActive }) =>
            `flex items-center py-1 px-3 rounded-lg transition-colors ${isActive ? "bg-slate-gray" : "hover:bg-slate-gray/50"}`
          }
        >
          <Car className="mr-3" />
          Taxistas
        </NavLink>
        <NavLink
          to="/rides"
          className={({ isActive }) =>
            `flex items-center py-1 px-3 rounded-lg transition-colors ${isActive ? "bg-slate-gray" : "hover:bg-slate-gray/50"}`
          }
        >
          <Route className="mr-3" />
          Carreras
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
