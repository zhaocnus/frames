import { connect } from 'react-redux';
import PreviewPanel from '../../components/PreviewPanel';

// import { getLocalSequence, uploadSequence } from '../../api';
// import { localSequenceLoaded, imageMetaReceived } from '../../actions';

const mapStateToProps = ({ sequence, cropArea }) => {
  return {
    sequence: sequence,
    cropArea: cropArea
  };
};

/**
 * Fetch image sequence from localstorage
 */
/*
function getSequenceAndUpload() {
  return function(dispatch) {
    waterfall([
      cb => {
        getLocalSequence((err, data) => {
          if (err) return cb(err);

          dispatch(localSequenceLoaded(data));
          cb(null, data.sequence);
        });
      },
      (croppedSequence, cb) => {
        uploadSequence(croppedSequence, (err, imageMeta) => {
          if (err) return cb(err);

          cb(null, imageMeta);
        });
      }
    ], (err, imageMeta) => {
      // TODO: error handling
      if (err) return;

      dispatch(imageMetaReceived(imageMeta));
    });
  }
}
*/

const PreviewPanelContainer = connect(
  mapStateToProps
)(PreviewPanel);

export default PreviewPanelContainer
