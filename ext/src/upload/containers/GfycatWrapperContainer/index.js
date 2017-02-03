import { connect } from 'react-redux';
import waterfall from 'async/waterfall';
import GfycatWrapper from '../../components/GfycatWrapper';
import { 
  createGif,
  checkCreationStatus 
} from '../../api/gfycat';
import { 
  gfycatCreationInitiated,
  gfycatCreationSucceeded,
  gfycatCreationFailed,
  gfycatCreationPropsUpdated  
} from '../../actions/gfycat';

const mapStateToProps = ({ user, imageMeta, gfycatMeta }) => {
  return { user, imageMeta, gfycatMeta };
};

function gfycatCreate() {
  return function(dispatch, getState) {
    waterfall([
      cb => {
        createGif(getState().imageMeta, (err, res) => {
          if (err) return cb(err);

          dispatch(gfycatCreationInitiated());
          cb(null, res.gfyname);
        });
      },
      (gfyname, cb) => {
        checkCreationStatus(gfyname, err => {
          if (err) return cb(err);

          cb(null, gfyname);
        });
      }
    ], (err, gfyname) => {
      if (err) return dispatch(gfycatCreationFailed(err));

      dispatch(gfycatCreationSucceeded(gfyname));
    });
  }
}

function updateImageMeta(gfycatCreationProps) {
  return function(dispatch) {
    dispatch(gfycatCreationPropsUpdated(gfycatCreationProps));
  };
}

const GfycatWrapperContainer = connect(
  mapStateToProps,
  { 
    gfycatCreate,
    updateImageMeta 
  }
)(GfycatWrapper);

export default GfycatWrapperContainer
