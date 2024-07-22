import PropTypes from "prop-types";

import { Checkbox } from "../../../design/Checkbox";

export function CostCheck({ cost, costs }) {
  return (
    <Checkbox
      checked={costs.has(cost)}
      onChange={(e) => {
        if (e.target.checked) {
          costs.add(cost);
        } else {
          costs.delete(cost);
        }
      }}
    >
      {cost} PP
    </Checkbox>
  );
}

CostCheck.propTypes = {
  cost: PropTypes.number,
  costs: PropTypes.any,
};
