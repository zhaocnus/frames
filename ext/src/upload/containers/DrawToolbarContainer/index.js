import { connect } from 'react-redux';
import DrawToolbar from '../../components/DrawToolbar';
import { strokeWidthSelected, strokeColorSelected } from '../../actions';

const mapStateToProps = ({ drawSettings }) => {
  return { drawSettings };
};

function selectStrokeWidth(strokeWidth) {
  return function(dispatch) {
    dispatch(strokeWidthSelected(strokeWidth));
  };
}

function selectStrokeColor(strokeColor) {
  return function(dispatch) {
    dispatch(strokeColorSelected(strokeColor));
  };
}

const DrawToolbarContainer = connect(
  mapStateToProps,
  { selectStrokeWidth, selectStrokeColor }
)(DrawToolbar);

export default DrawToolbarContainer
