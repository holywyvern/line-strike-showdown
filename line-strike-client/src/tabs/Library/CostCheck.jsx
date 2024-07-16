import PropTypes from "prop-types";

import { Checkbox } from "../../design/Checkbox";

export function CostCheck({ cost, costs, setCosts }) {
  return (
    <Checkbox
      checked={costs.has(cost)}
      onChange={(e) => {
        setCosts((old) => {
          const elements = new Set(old);
          if (e.target.checked) {
            elements.add(cost);
          } else {
            elements.delete(cost);
          }
          return elements;
        });
      }}
    >
      {cost} PP
    </Checkbox>
  );
}

CostCheck.propTypes = {
  cost: PropTypes.number,
  costs: PropTypes.any,
  setCosts: PropTypes.func,
};
