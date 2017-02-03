import React, { PropTypes } from 'react';
import { STROKE_WIDTHS } from '../../constants';

const Dot = ({ size, color }) => (
  <span
    className={'dot _' + size}
    style={color ? { background: color } : null} />
);

Dot.propTypes = {
  size: PropTypes.oneOf(STROKE_WIDTHS).isRequired,
  color: PropTypes.string
};

export default Dot