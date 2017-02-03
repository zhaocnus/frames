import React, { PropTypes } from 'react';
import ImageCanvas from './ImageCanvas';
import DrawCanvas from './DrawCanvas';

const PreviewCanvas = (props) => (
  <div className="preview-canvas">
    <div className="canvas-wrapper">
      <ImageCanvas 
        base64={props.base64}
        frame={props.frame}
        width={props.width}
        height={props.height} />
      <DrawCanvas 
        width={props.width}
        height={props.height}
        isDrawingMode={props.isDrawingMode}
        drawSettings={props.drawSettings}
        saveDrawLayer={props.saveDrawLayer} />        
    </div>
  </div>
);

PreviewCanvas.propTypes = {
  base64: PropTypes.string.isRequired,
  frame: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isDrawingMode: PropTypes.bool.isRequired,
  drawSettings: PropTypes.object.isRequired,

  // container functions
  saveDrawLayer: PropTypes.func.isRequired
};

export default PreviewCanvas