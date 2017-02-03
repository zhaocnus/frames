import React, { PropTypes } from 'react';

const PreviewInfo = ({ numFrames, width, height }) => (
  <div className="preview-info">
    <h3>Gif information</h3>
    <dl className="dl-horizontal">
      <dt>Frames</dt>
      <dd>{numFrames}</dd>
    </dl>
    <dl className="dl-horizontal">
      <dt>Width</dt>
      <dd>{width}</dd>
    </dl>
    <dl className="dl-horizontal">
      <dt>Height</dt>
      <dd>{height}</dd>
    </dl>
  </div>
);

PreviewInfo.propTypes = {
  numFrames: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default PreviewInfo