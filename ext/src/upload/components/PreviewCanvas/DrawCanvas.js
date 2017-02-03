import React, { Component, PropTypes } from 'react';

class PreviewCanvas extends Component {
  constructor(props) {
    super(props);
    
    // functions
    this._drawLine = this._drawLine.bind(this);
    this._startDrawLine = this._startDrawLine.bind(this);
    this._stopDrawLine = this._stopDrawLine.bind(this);
    this._getMousePosition = this._getMousePosition.bind(this);
  }

  render() {
    return (
      <canvas
        className={
          'draw-canvas ' + (this.props.isDrawingMode ? 'draw' : '')
        }
        ref="drawCanvas"
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this._startDrawLine}
        onMouseMove={this._drawLine}
        onMouseUp={this._stopDrawLine}
        onMouseLeave={this._stopDrawLine} />
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  _drawLine(e) {
    if (!this.props.isDrawingMode || !this._lastPoint) return;

    const point = this._getMousePosition(e);
    const ctx = this.refs.drawCanvas.getContext('2d');

    ctx.strokeStyle = this.props.drawSettings.strokeColor;
    ctx.lineJoin = 'round';
    ctx.lineWidth = this.props.drawSettings.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(this._lastPoint.x, this._lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();

    // for next event
    this._lastPoint = point;
  }

  _startDrawLine(e) {
    if (!this.props.isDrawingMode) return;

    // clear previous timer
    clearTimeout(this._timer);

    this._lastPoint = this._getMousePosition(e);
  }

  _stopDrawLine() {
    if (!this.props.isDrawingMode || !this._lastPoint) return;

    this._lastPoint = null;

    // Save draw layer as a base64 image
    // When converting to gif, EACH frame needs to add this draw layer
    this._timer = setTimeout(() => {
      this.props.saveDrawLayer(this.refs.drawCanvas.toDataURL('image/png'));
    }, 200);
  }

  _getMousePosition(e) {
    const rect = e.target.getBoundingClientRect();
    const ratioX = e.target.width / rect.width;
    const ratioY = e.target.height / rect.height;

    return {
      x: (e.clientX - rect.left) * ratioX,
      y: (e.clientY - rect.top) * ratioY
    };
  }
}

PreviewCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isDrawingMode: PropTypes.bool.isRequired,
  drawSettings: PropTypes.object.isRequired,
  saveDrawLayer: PropTypes.func.isRequired
};

export default PreviewCanvas