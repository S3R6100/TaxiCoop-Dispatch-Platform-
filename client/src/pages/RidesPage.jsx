import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getRides } from "../services/api";
import { RefreshCw } from "lucide-react";

const RidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const data = await getRides();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
      // Here you would set an error state to show in the UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      case 'En Camino':
        return 'bg-blue-100 text-blue-800';
      case 'Solicitada':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Header title="Carreras" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Historial de Carreras</h2>
            <button 
                onClick={fetchRides} 
                className="bg-taxi-yellow hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition-colors"
                disabled={loading}
            >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Actualizando...' : 'Actualizar'}</span>
            </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Cargando...</div>
          ) : (
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Origen</th>
                  <th className="px-5 py-3">Destino</th>
                  <th className="px-5 py-3">Conductor</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Precio</th>
                  <th className="px-5 py-3">Duración</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride) => (
                  <tr key={ride.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm bg-white">{ride.id}</td>
                    <td className="px-5 py-4 text-sm bg-white">{ride.client}</td>
                    <td className="px-5 py-4 text-sm bg-white">{ride.origin}</td>
                    <td className="px-5 py-4 text-sm bg-white">{ride.destination}</td>
                    <td className="px-5 py-4 text-sm bg-white">{ride.driver}</td>
                    <td className="px-5 py-4 text-sm bg-white">
                      <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusBadge(ride.status)}`}>
                        {ride.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm bg-white">${ride.price}</td>
                    <td className="px-5 py-4 text-sm bg-white">{ride.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RidesPage;
