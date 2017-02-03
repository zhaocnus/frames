import React, { PropTypes } from 'react';

const ToggleButton = ({ icon, text, size, selected, pullRight, disabled, onClick }) => (
  <button
    type="button"
    className={
      'btn' +
      (size ? ` btn-${size}` : '') +
      (selected ? ' btn-primary' : ' btn-default') +
      (pullRight ? ' pull-right' : '')
    }
    disabled={disabled}
    onClick={onClick}>
    {icon}
    {text}
  </button>
);

ToggleButton.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
  selected: PropTypes.bool.isRequired,
  pullRight: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

ToggleButton.defaultProps = {
  selected: false
};

export default ToggleButton