import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";

import { useDatabase } from "../../contexts/DatabaseContext";

export const DeckBuilderFormatContext = createContext(null);

export function useDeckBuilderFormat() {
  return useContext(DeckBuilderFormatContext);
}

export function useDeckBuilderFormatFinder() {
  const { standardFormatID, formats } = useDatabase();
  const params = useParams();

  const slug =
    params?.format?.toLocaleLowerCase() || formats[standardFormatID].slug;
  const format = formats.find((i) => i?.slug === slug);
  return format;
}
