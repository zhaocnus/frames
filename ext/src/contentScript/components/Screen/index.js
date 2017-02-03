import React, { PropTypes } from 'react';

const ScreenTop = ({ height }) => (
  <div
    className="screen top"
    style={{
      height: height + 'px'
    }} />
);

ScreenTop.propTypes = {
  height: PropTypes.number.isRequired
};

const ScreenBottom = ({ top }) => (
  <div
    className="screen bottom"
    style={{
      top: top + 'px'
    }} />
);

ScreenBottom.propTypes = {
  top: PropTypes.number.isRequired
};

const ScreenLeft = ({ top, width, height }) => (
  <div
    className="screen left"
    style={{
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    }} />
);

ScreenLeft.propTypes = {
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

const ScreenRight = ({ top, left, height }) => (
  <div
    className="screen right"
    style={{
      top: top + 'px',
      left: left + 'px',
      height: height + 'px'
    }} />
);

ScreenRight.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export { ScreenTop, ScreenBottom, ScreenLeft, ScreenRight }