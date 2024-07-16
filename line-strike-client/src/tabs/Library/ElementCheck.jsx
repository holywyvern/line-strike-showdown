import PropTypes from "prop-types";

import { Checkbox } from "../../design/Checkbox";

export function ElementCheck({ element, visibleElements, setVisibleElements }) {
  return (
    <Checkbox
      checked={visibleElements.has(element)}
      onChange={(e) => {
        setVisibleElements((old) => {
          const elements = new Set(old);
          if (e.target.checked) {
            elements.add(element);
          } else {
            elements.delete(element);
          }
          return elements;
        });
      }}
    >
      <img src={`elements/${element}.webp`} /> Cards
    </Checkbox>
  );
}

ElementCheck.propTypes = {
  element: PropTypes.string,
  visibleElements: PropTypes.any,
  setVisibleElements: PropTypes.func,
};
