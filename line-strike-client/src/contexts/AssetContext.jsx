import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { PLAYMATS, SLEEVES } from "../assets/constants";

import { useCards } from "../hooks/useCards";

function loadImage(folder, name) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `${folder}/${name}`;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function useAssetState() {
  const cardState = useCards();
  const [state, setState] = useState("pending");
  const [assets, setAssets] = useState({});
  useEffect(() => {
    if (!cardState.isLoaded) return;

    const playmats = Promise.all(PLAYMATS.map((i) => loadImage("playmats", i)));
    const sleeves = Promise.all(SLEEVES.map((i) => loadImage("sleeves", i)));
    const cards = Promise.all(
      cardState.cards.map((i) =>
        i ? loadImage("cards", i.artwork) : Promise.resolve(null)
      )
    );

    const onLoad = ([playmats, sleeves, cards]) => {
      setState("loaded");
      setAssets({ playmats, sleeves, cards });
    };
    const onError = (error) => {
      setState("error");
      setAssets({ error });
    };

    Promise.all([playmats, sleeves, cards]).then(onLoad, onError);
  }, [cardState.isLoaded, cardState.cards]);
  return {
    ...assets,
    state,
    isLoading: state === "pending",
    isLoaded: state === "loaded",
    isError: state === "error",
  };
}

const Context = createContext();

function useAssets() {
  return useContext(Context);
}

export function AssetContext({ children }) {
  const state = useAssetState();
  return <Context.Provider value={state}>{children}</Context.Provider>;
}

AssetContext.hook = useAssets;

AssetContext.propTypes = {
  children: PropTypes.node,
};
