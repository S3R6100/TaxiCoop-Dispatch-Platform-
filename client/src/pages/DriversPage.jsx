import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  getDrivers,
  updateDriverStatus,
  createDriver,
  deleteDriver,
} from "../services/api";

const statusOptions = ["Disponible", "Ocupado", "Inactivo"];

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [total, setTotal] = useState(0);
  const [newDriver, setNewDriver] = useState({
    name: "",
    plate: "",
    zone: "",
    status: "Disponible",
  });

  const fetchDrivers = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDrivers({ page: p, pageSize });
      setDrivers(res.data);
      setTotal(res.total);
    } catch (err) {
      setError("Error al cargar taxistas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers(page);
  }, [page]);

  const handleStatusChange = async (driverId, status) => {
    try {
      setLoading(true);
      await updateDriverStatus(driverId, status);
      fetchDrivers(page);
    } catch (err) {
      setError("No se pudo actualizar el estado");
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createDriver(newDriver);
      setNewDriver({ name: "", plate: "", zone: "", status: "Disponible" });
      fetchDrivers(page);
    } catch (err) {
      setError("No se pudo crear el taxista");
      setLoading(false);
    }
  };

  const handleDelete = async (driverId) => {
    if (!confirm("Eliminar taxista?")) return;
    try {
      setLoading(true);
      await deleteDriver(driverId);
      // If last item on page removed, go to previous page if possible
      const newTotal = total - 1;
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize));
      if (page > lastPage) setPage(lastPage);
      else fetchDrivers(page);
    } catch (err) {
      setError("No se pudo eliminar el taxista");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Taxistas" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lista de Taxistas</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          {loading ? (
            <div className="p-8 text-center">Cargando...</div>
          ) : error ? (
            <div className="p-4 text-red-600">{error}</div>
          ) : (
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="px-5 py-3">Nombre</th>
                  <th className="px-5 py-3">Placa</th>
                  <th className="px-5 py-3">Zona</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-sm bg-white">{d.name}</td>
                    <td className="px-5 py-4 text-sm bg-white">{d.plate}</td>
                    <td className="px-5 py-4 text-sm bg-white">{d.zone}</td>
                    <td className="px-5 py-4 text-sm bg-white">
                      <select
                        value={d.status}
                        onChange={(e) =>
                          handleStatusChange(d.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-sm bg-white">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="mr-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
              disabled={page * pageSize >= total}
            >
              Siguiente
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Mostrando {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, total)} de {total}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Agregar nuevo taxista</h3>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 sm:grid-cols-4 gap-3"
          >
            <input
              required
              placeholder="Nombre"
              value={newDriver.name}
              onChange={(e) =>
                setNewDriver({ ...newDriver, name: e.target.value })
              }
              className="border rounded p-2"
            />
            <input
              required
              placeholder="Placa"
              value={newDriver.plate}
              onChange={(e) =>
                setNewDriver({ ...newDriver, plate: e.target.value })
              }
              className="border rounded p-2"
            />
            <input
              required
              placeholder="Zona"
              value={newDriver.zone}
              onChange={(e) =>
                setNewDriver({ ...newDriver, zone: e.target.value })
              }
              className="border rounded p-2"
            />
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-taxi-yellow hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
