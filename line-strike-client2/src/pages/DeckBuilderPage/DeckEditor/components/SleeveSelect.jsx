import PropTypes from "prop-types";

import { ImageSelect } from "../../../../design/ImageSelect";

import { SLEEVES } from "../../../../assets/constants";

export function SleeveSelect(props) {
  return (
    <ImageSelect
      folder="sleeves"
      collection={SLEEVES}
      title="Select Sleeve"
      {...props}
    />
  );
}

SleeveSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.string,
};
