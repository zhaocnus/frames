import React, { Component, PropTypes } from 'react';

class ImageCanvas extends Component {
  constructor(props) {
    super(props);

    this._canDrawImage = true;
    
    // functions
    this._drawImage = this._drawImage.bind(this);
  }

  componentDidMount() {
    this._drawImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.frame !== this.props.frame || prevProps.base64 !== this.props.base64) {
      this._drawImage();
    }
  }

  render() {
    return (
      <canvas
        className="image-canvas"
        ref="imageCanvas"
        width={this.props.width}
        height={this.props.height} />
    );
  }

  _drawImage() {
    if (this._isDrawingImage) return;

    this._isDrawingImage = false;

    const ctx = this.refs.imageCanvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      this._isDrawingImage = false;
    };
    img.src = this.props.base64;
  }
}

ImageCanvas.propTypes = {
  base64: PropTypes.string.isRequired,
  frame: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default ImageCanvas