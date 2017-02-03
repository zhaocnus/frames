import React, { PropTypes } from 'react';

const Loader = ({ text }) => (
  <div className="progress">
    <div
      className="progress-bar progress-bar-success progress-bar-striped active"
      style={{ width: '100%'}} >
      <span>{text}</span>
    </div>
  </div>
);

Loader.propTypes = {
  text: PropTypes.string.isRequired
}

export default Loader