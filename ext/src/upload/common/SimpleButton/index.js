import React, { PropTypes } from 'react';

const SimpleButton = ({ disabled, text, types, size, icon, onClick }) => {
  const className = 'btn' +
      (size ? ` btn-${size}` : '') +
      (types.map(type => ` btn-${type}` ).join(''));

  if (disabled) {
    return (
      <button
        type="button"
        className={className}
        disabled="disabled" >
        {icon}
        {text}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick} >
        {icon}
        {text}
      </button>
    );
  }
};

SimpleButton.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

SimpleButton.defaultProps = {
  types: ['default']
};

export default SimpleButton