import { Link } from "react-router-dom";

function App() {
  return (
    <main className="min-h-dvh grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
      <Link
        to={"me/users"}
        className="flex items-center justify-center bg-blue-300 p-8 text-center text-3xl md:text-5xl font-semibold"
      >
        Les utilisateurs
      </Link>

      <Link
        to={"me/demandes"}
        className="flex items-center justify-center bg-gray-300 p-8 text-center text-3xl md:text-5xl font-semibold"
      >
        Les demandes
      </Link>
    </main>
  );
}

export default App;
