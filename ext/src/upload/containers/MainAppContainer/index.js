import { connect } from 'react-redux';
import MainApp from '../../components/MainApp';
import { getSequenceFromLocalStorage } from '../../api/sequence';
import { localSequenceLoaded } from '../../actions';

const mapStateToProps = ({ sequence }) => {
  return {
    hasSequence: sequence.length > 0
  };
};

/** 
 * Fetch initial app data
 */
function fetchInitData() {
  return function(dispatch) {
    getSequenceFromLocalStorage((err, data) => {
      if (err) return;

      dispatch(localSequenceLoaded(data));
    });
  };
}

const MainAppContainer = connect(
  mapStateToProps,
  { fetchInitData }
)(MainApp);

export default MainAppContainer
