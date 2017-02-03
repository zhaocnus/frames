import React, { PropTypes } from 'react';
import PreviewButton from './PreviewButton';
import PreviewSlider from './PreviewSlider';

const PreviewControls = ({ isPlaying, onToggle, onSliderChange, min, max, value }) => (
  <div className="preview-controls">
    <PreviewSlider
      min={min}
      max={max}
      value={value}
      onChange={onSliderChange} />
    <PreviewButton
      isPlaying={isPlaying}
      onToggle={onToggle} />
  </div>
);

PreviewControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired
};

export default PreviewControls