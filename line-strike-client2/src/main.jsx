import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import "./perfect-scrollbars.scss";
import "react-modern-drawer/dist/index.css";

import { Root } from "./layouts/Root";

import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { CollectionPage } from "./pages/CollectionPage";

import { rootLoader } from "./loaders/rootLoader";

import { PlayLayout } from "./layouts/PlayLayout";
import { PlayHome } from "./pages/PlayHome";
import { CollectionPlayPage } from "./pages/CollectionPlayPage";
import { DeckBuilderHome } from "./pages/DeckBuilderHome";
import { DeckBuilderLayout } from "./layouts/DeckBuilderLayout";
import { DeckBuilderPage } from "./pages/DeckBuilderPage";

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
        path: "/play",
        element: <PlayLayout />,
        children: [
          {
            index: true,
            element: <PlayHome />,
          },
          {
            path: "cards",
            element: <CollectionPlayPage />,
          },
          {
            path: "decks",
            element: <DeckBuilderLayout />,
            children: [
              {
                index: true,
                element: <DeckBuilderHome />,
              },
              {
                path: ":format",
                children: [
                  {
                    index: true,
                    element: <DeckBuilderHome />,
                  },
                  {
                    path: ":deckIndex",
                    element: <DeckBuilderPage />
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
