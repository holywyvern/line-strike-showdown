import PropTypes from "prop-types";

import { ImageSelect } from "../../design/ImageSelect";

import { PLAYMATS } from "../../assets/constants";

export function PlaymatSelect(props) {
  return (
    <ImageSelect
      folder="playmats"
      collection={PLAYMATS}
      title="Select Playmat"
      {...props}
    />
  );
}

PlaymatSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
