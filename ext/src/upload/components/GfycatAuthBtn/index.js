import React, { PropTypes } from 'react';

const GfycatAuthBtn = ({ onClick }) => (
  <button
    className="btn btn-primary btn-lg btn-block"
    onClick={onClick}>
    Login and upload to Gfycat
  </button>
);

GfycatAuthBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default GfycatAuthBtn