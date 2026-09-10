import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Dashboard from "./Dashboard";
import Donnees from "./LesUtilisateurs";
import DetailsUtilisateur from "./DetailsUtilisateur";
import LesDemandes from "./LesDemandes";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "me",
        element: <Dashboard />,
        children: [
          {
            path: "users",
            element: <Donnees />,
          },
          {
            path: "users/:id",
            element: <DetailsUtilisateur />,
          },
          {
            path: "demandes",
            element: <LesDemandes />,
          },
        ],
      },
    ],
  },
]);
export {routes};
