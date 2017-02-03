import { connect } from 'react-redux';
import PreviewCanvasToolbar from '../../components/PreviewCanvasToolbar';
import { toolSelected } from '../../actions';

const mapStateToProps = ({ currentTool }) => {
  return { currentTool };
};

function selectTool(toolId) {
  return function(dispatch) {
    dispatch(toolSelected(toolId));
  };
}

const PreviewCanvasToolbarContainer = connect(
  mapStateToProps,
  { selectTool }
)(PreviewCanvasToolbar);

export default PreviewCanvasToolbarContainer
