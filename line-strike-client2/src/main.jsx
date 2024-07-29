import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import "./perfect-scrollbars.scss";
import "react-modern-drawer/dist/index.css";

import { Root } from "./layouts/Root";

import { rootLoader } from "./loaders/rootLoader";
import { accountLoader } from "./loaders/accountLoader";
import { matchLoader } from "./loaders/matchLoader";

import { WebAudio } from "./utils/WebAudio";

import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { LinkingTerms } from "./pages/LinkingTerms";

import { DeckBuilderLayout } from "./layouts/DeckBuilderLayout";

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
        path: "/terms-and-conditions",
        element: <LinkingTerms />,
      },
      {
        path: "/cards",
        async lazy() {
          const { CollectionPage: Component } = await import(
            "./pages/CollectionPage"
          );
          return { Component };
        },
      },
      {
        path: "/play",
        async lazy() {
          const { PlayLayout: Component } = await import(
            "./layouts/PlayLayout"
          );
          return { Component };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { PlayHome: Component } = await import("./pages/PlayHome");
              return { Component };
            },
          },
          {
            path: "requests",
            async lazy() {
              const { BattleRequestsPage: Component } = await import(
                "./pages/BattleRequestsPage"
              );
              return { Component };
            },
          },
          {
            path: "cards",
            async lazy() {
              const { CollectionPlayPage: Component } = await import(
                "./pages/CollectionPlayPage"
              );
              return { Component };
            },
          },
          {
            path: "battles/:battleID",
            async lazy() {
              const { BattlePage: Component } = await import(
                "./pages/BattlePage"
              );
              return { Component };
            },
          },
          {
            path: "replays/:battleID",
            async lazy() {
              const { ReplayPage: Component } = await import(
                "./pages/ReplayPage"
              );
              return { Component };
            },
          },
          {
            path: "accounts/:accountID",
            async lazy() {
              const { AccountLayout: Component } = await import(
                "./layouts/AccountLayout"
              );
              return { Component };
            },
            children: [
              {
                index: true,
                loader: accountLoader,
                async lazy() {
                  const { AccountPage: Component } = await import(
                    "./pages/AccountPage"
                  );
                  return { Component };
                },
              },
              {
                path: "matches",
                loader: matchLoader,
                async lazy() {
                  const { AccountMatchesPage: Component } = await import(
                    "./pages/AccountMatchesPage"
                  );
                  return { Component };
                },
              },
            ],
          },
          {
            path: "decks",
            element: <DeckBuilderLayout />,
            children: [
              {
                index: true,
                async lazy() {
                  const { DeckBuilderHome: Component } = await import(
                    "./pages/DeckBuilderHome"
                  );
                  return { Component };
                },
              },
              {
                path: ":format",
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { DeckBuilderHome: Component } = await import(
                        "./pages/DeckBuilderHome"
                      );
                      return { Component };
                    },
                  },
                  {
                    path: ":deckIndex",
                    async lazy() {
                      const { DeckBuilderPage: Component } = await import(
                        "./pages/DeckBuilderPage"
                      );
                      return { Component };
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

WebAudio.initialize();

const root = document.getElementById("root");

while (root.lastChild) {
  root.removeChild(root.lastChild);
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
