import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Routes from "./pages/Routes.tsx";
import Donnees from "./pages/LesUtilisateurs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Routes/>,
    children: [
      {
        path: "",
        element: <Donnees />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
