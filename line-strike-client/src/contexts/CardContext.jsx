import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import cards from "../services/cards";

const DEFAULT_STATE = { cards: [], skills: [], status: "pending" };

const Context = createContext(DEFAULT_STATE);

function useCards() {
  return useContext(Context);
}

export function CardContext({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const setCards = (cards) => {
      setState({ status: "loaded", ...cards });
    };
    const setError = (error) => {
      setState({ status: "error", error });
    };
    cards.load().then(setCards, setError);
  }, []);
  return (
    <Context.Provider
      value={{
        ...state,
        isLoading: state.status === "loading",
        isLoaded: state.status === "loaded",
        isError: state.status === "error",
      }}
    >
      {children}
    </Context.Provider>
  );
}

CardContext.hook = useCards;

CardContext.propTypes = {
  children: PropTypes.node,
};
