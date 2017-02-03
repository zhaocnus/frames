import React, { PropTypes } from 'react';

const Color = ({ color }) => (
  <span className="color">
    <i style={{ background: color }} />
  </span>
);

Color.propTypes = {
  color: PropTypes.string
};

export default Color