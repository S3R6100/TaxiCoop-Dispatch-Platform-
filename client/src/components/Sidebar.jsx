import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Route } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-navy-blue text-white flex flex-col">
      <div className="p-6 text-2xl font-semibold text-taxi-yellow">
        TaxiCoop
      </div>
      <nav className="flex flex-col p-4">
        <NavLink to="/" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-slate-gray' : 'hover:bg-slate-gray/50'}`}>
          <LayoutDashboard className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink to="/drivers" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-slate-gray' : 'hover:bg-slate-gray/50'}`}>
          <Car className="mr-3" />
          Taxistas
        </NavLink>
        <NavLink to="/rides" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-slate-gray' : 'hover:bg-slate-gray/50'}`}>
          <Route className="mr-3" />
          Carreras
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
