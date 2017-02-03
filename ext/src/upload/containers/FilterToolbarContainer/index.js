import { connect } from 'react-redux';
import FilterToolbar from '../../components/FilterToolbar';
import { applyFilterToSequence } from '../../api/sequence';
import { filterSelected, filterSucceeded } from '../../actions';

const mapStateToProps = ({ filterSettings }) => {
  return { filterSettings };
};

function selectFilter(filterId) {
  return function(dispatch) {
    dispatch(filterSelected(filterId));

    applyFilterToSequence(filterId, (err, sequence) => {
      dispatch(filterSucceeded(sequence));
    });
  };
}

const FilterToolbarContainer = connect(
  mapStateToProps,
  { selectFilter }
)(FilterToolbar);

export default FilterToolbarContainer
