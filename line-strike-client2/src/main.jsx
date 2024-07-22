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
