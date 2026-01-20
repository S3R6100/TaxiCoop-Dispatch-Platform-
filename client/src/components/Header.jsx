const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm p-6">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </header>
  );
};

export default Header;
