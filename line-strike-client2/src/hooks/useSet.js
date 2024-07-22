import { useState } from "react";

const DEFAULT_VALUE = new Set();

/**
 * @typeparam {T}
 * @param {Iterable<T>|(() => T)|undefined} defaultValue
 */
export function useSet(defaultValue) {
  const [set, setSet] = useState(
    () =>
      new Set(
        typeof defaultValue === "function"
          ? defaultValue()
          : defaultValue || DEFAULT_VALUE
      )
  );
  return Object.freeze({
    has(value) {
      return set.has(value);
    },
    add(value) {
      setSet((set) => {
        const newSet = new Set(set);
        newSet.add(value);
        return newSet;
      });
    },
    delete(value) {
      setSet((set) => {
        const newSet = new Set(set);
        newSet.delete(value);
        return newSet;
      });
    },

    [Symbol.iterator]() {
      return set[Symbol.iterator]();
    },
  });
}
