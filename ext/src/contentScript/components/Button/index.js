import React, { PropTypes } from 'react';

const Button = ({ text, onClick }) => (
  <div
    style={{
      padding: '10px',
      background: '#F00',
      color: '#FFF',
      fontSize: '12px',
      fontFamily: 'Arial',
      display: 'inline-block',
      cursor: 'pointer'
    }}
    onClick={onClick}>{text}</div>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button