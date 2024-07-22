import PropTypes from "prop-types";

import { Checkbox } from "../../../design/Checkbox";

export function ElementCheck({ element, visibleElements }) {
  return (
    <Checkbox
      checked={visibleElements.has(element)}
      onChange={(e) => {
        if (e.target.checked) {
          visibleElements.add(element);
        } else {
          visibleElements.delete(element);
        }
      }}
    >
      <img src={`elements/${element}.webp`} /> Cards
    </Checkbox>
  );
}

ElementCheck.propTypes = {
  element: PropTypes.string,
  visibleElements: PropTypes.any,
};
