import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import "./perfect-scrollbars.scss";
import 'react-modern-drawer/dist/index.css';

import { Root } from "./layouts/Root";

import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { CollectionPage } from "./pages/CollectionPage";
import { DeckEditorPage } from "./pages/DeckEditorPage";
import { BattlePage } from "./pages/BattlePage";

import { rootLoader } from "./loaders/rootLoader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cards",
        element: <CollectionPage />,
      },
      {
        path: "/edit/:formatID/decks/:deckID",
        element: <DeckEditorPage />,
      },
      {
        path: "/battle/:roomID",
        element: <BattlePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
