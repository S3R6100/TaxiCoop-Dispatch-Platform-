import Header from "../components/Header";
import KpiCard from "../components/KpiCard";
import { Activity, Car, Clock, Users } from "lucide-react";
import { mockRides } from "../data/mockRides";

const DashboardPage = () => {
  // derive some simple metrics from mockRides
  const ridesToday = mockRides.length;
  const inProgress = mockRides.filter((r) => r.status === "En Camino").length;
  const avgWait = "5 min";
  const driversAvailable = 45;

  const recent = mockRides.slice(0, 5);

  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KpiCard
            title="Carreras hoy"
            value={ridesToday}
            icon={Activity}
            accent="bg-taxi-yellow"
          />
          <KpiCard
            title="Carreras en curso"
            value={inProgress}
            icon={Car}
            accent="bg-blue-500"
          />
          <KpiCard
            title="Tiempo promedio"
            value={avgWait}
            icon={Clock}
            accent="bg-green-400"
            subtitle="espera"
          />
          <KpiCard
            title="Conductores disponibles"
            value={driversAvailable}
            icon={Users}
            accent="bg-slate-gray"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Resumen de flota</h3>
            <p className="text-sm text-gray-600">
              Estado rápido de la flota y métricas clave.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Total Carreras</div>
                <div className="text-xl font-semibold">{ridesToday}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">En camino</div>
                <div className="text-xl font-semibold">{inProgress}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Promedio espera</div>
                <div className="text-xl font-semibold">{avgWait}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Conductores</div>
                <div className="text-xl font-semibold">{driversAvailable}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Últimas Carreras</h3>
            <div className="overflow-hidden rounded">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Cliente</th>
                    <th className="px-3 py-2">Destino</th>
                    <th className="px-3 py-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {r.id}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {r.client}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {r.destination}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${r.status === "Finalizada" ? "bg-green-100 text-green-800" : r.status === "En Camino" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
