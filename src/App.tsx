import { Link } from "react-router-dom";


function App() {
  return (
    <section>
      <div>
        <Link to={"me/users"}>Les utilisateurs</Link>
      </div>
      <div>
        <Link to={"me/demandes"}>Les demandes</Link>
      </div>
    </section>
  );
}

export default App;
