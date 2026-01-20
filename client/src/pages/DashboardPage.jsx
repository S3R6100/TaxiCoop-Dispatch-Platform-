import Header from "../components/Header";

const DashboardPage = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-6">
        {/* KPI Cards will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Carreras hoy</h3>
            <p className="text-3xl font-semibold text-gray-800">123</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Carreras en curso</h3>
            <p className="text-3xl font-semibold text-gray-800">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Tiempo promedio de espera</h3>
            <p className="text-3xl font-semibold text-gray-800">5 min</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Conductores disponibles</h3>
            <p className="text-3xl font-semibold text-gray-800">45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
