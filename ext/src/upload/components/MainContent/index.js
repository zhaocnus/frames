import React, { PropTypes } from 'react';

const MainContent = ({ leftChild, rightChild }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-6 col-md-8 col-lg-9">{leftChild}</div>
      <div className="col-sm-6 col-md-4 col-lg-3">{rightChild}</div>
    </div>
  </div>
);

MainContent.propTypes = {
  leftChild: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]),
  rightChild: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ])
};

export default MainContent