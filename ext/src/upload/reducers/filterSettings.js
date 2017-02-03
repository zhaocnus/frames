import { 
  FILTER_SELECTED,
  FILTER_SUCCEEDED
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case FILTER_SELECTED:
      return Object.assign({}, state, { filterId: action.filterId, isApplying: true });
    case FILTER_SUCCEEDED:
      return Object.assign({}, state, { isApplying: false });
    default:
      return state;
  }
}