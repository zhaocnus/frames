import { connect } from 'react-redux';
import GifPanel from '../../components/GifPanel';
import { uploadSequenceToServer } from '../../api/sequence';
import { conversionStarted, conversionSucceeded } from '../../actions';

const mapStateToProps = ({ sequence, imageMeta }) => {
  return {
    loadingSequence: sequence.length === 0,
    imageMeta
  };
};

/**
 * Update sequence to server and conver to gif
 */
function convert() {
  return function(dispatch) {
    dispatch(conversionStarted());

    uploadSequenceToServer((err, imageMeta) => {
      if (err) return;

      dispatch(conversionSucceeded(imageMeta));
    });
  };
}

const GifPanelContainer = connect(
  mapStateToProps,
  { convert }
)(GifPanel);

export default GifPanelContainer

/*
import { requestGfycatAuth } from '../../api';

const mapStateToProps = ({ sequence, imageMeta }) => {
  return {
    loadingSequence: sequence.length === 0,
    imageMeta
  };
};

function gfycatAuth() {
  return function() {
    requestGfycatAuth(err => {
      console.log(err);
    });
  };
}

const GifPanelContainer = connect(
  mapStateToProps,
  { gfycatAuth }
)(GifPanel);

export default GifPanelContainer
*/
