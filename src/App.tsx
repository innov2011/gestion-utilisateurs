import { Link } from "react-router-dom";

function App() {
  return (
    <main>
      <div className="relative">
        <div
          className="absolute top-4 left-4 uppercase 
        text-white text-xl md:text-md font-bold"
        >
          Les nouvelles vies
        </div>
      </div>
      <section className="min-h-dvh grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div
          className="flex items-center justify-center bg-blue-600 p-8 
      text-center text-2xl md:text-4xl font-semibold"
        >
          <Link
            to={"me/users"}
            className="bg-white rounded-lg p-5 
          text-2xl md:text-4xl font-semibold text-blue-800
          shadow-md shadow-black hover:shadow-lg hover:shadow-black 
          border-4 border-black"
          >
            Les utilisateurs
          </Link>
        </div>

        <div
          className="flex items-center justify-center bg-white p-8 
      text-center text-3xl md:text-5xl font-semibold"
        >
          <Link
            to={"me/demandes"}
            className="bg-blue-600 rounded-lg p-5 
          text-2xl md:text-4xl font-semibold  text-white
          shadow-md shadow-black hover:shadow-lg hover:shadow-black 
          border-4 border-black"
          >
            Les demandes
          </Link>
        </div>
      </section>
    </main>
  );
}

export default App;
