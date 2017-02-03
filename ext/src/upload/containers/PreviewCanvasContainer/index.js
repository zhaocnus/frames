import { connect } from 'react-redux';
import PreviewCanvas from '../../components/PreviewCanvas';
import { updateDrawLayer } from '../../api/sequence';

const mapStateToProps = ({ currentTool, drawSettings }) => {
  return { 
    isDrawingMode: currentTool.id === '1',
    drawSettings
  };
};

function saveDrawLayer(dataUrl) {
  return function() {
    updateDrawLayer(dataUrl);
  }
}

const PreviewCanvasContainer = connect(
  mapStateToProps,
  { saveDrawLayer }
)(PreviewCanvas);

export default PreviewCanvasContainer
