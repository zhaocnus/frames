import React, { PropTypes } from 'react';

const PreviewButton = ({ isPlaying, onToggle }) => (
  <button
    type="button"
    className="btn btn-default preview-button"
    onClick={onToggle}>
    <span
      className={
        isPlaying ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play'
      } />
  </button>
);

PreviewButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default PreviewButton