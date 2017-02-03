import React, { PropTypes } from 'react';

const ButtonGroup = ({ children, size }) => (
  <div
    className={
      'btn-group' + (size ? ` btn-group-${size}` : '')
    }>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'lg'])
}

export default ButtonGroup