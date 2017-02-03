import React, { PropTypes } from 'react';
import Slider from 'rc-slider';

const PreviewSlider = ({ min, max, value, onChange }) => (
  <div className="preview-slider">
    <Slider
      min={min}
      max={max}
      value={value}
      onChange={onChange} />
  </div>
);

PreviewSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PreviewSlider