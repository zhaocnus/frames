import React, { PropTypes } from 'react';
import PreviewInfo from '../PreviewInfo';
import PreviewCanvasWrapper from '../PreviewCanvasWrapper';

const PreviewPanel = ({ sequence, cropArea }) => {
  if (sequence.length === 0) return null;

  return (
    <div>
      <PreviewCanvasWrapper
        sequence={sequence}
        cropArea={cropArea} />
      <PreviewInfo
        numFrames={sequence.length}
        width={cropArea.width}
        height={cropArea.height} />
    </div>
  );
};

PreviewPanel.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.string).isRequired,
  cropArea: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default PreviewPanel