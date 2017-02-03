import { 
  LOCAL_SEQUENCE_LOADED,
  FILTER_SUCCEEDED
} from '../constants/actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case LOCAL_SEQUENCE_LOADED:
      return action.sequence;
    case FILTER_SUCCEEDED:
      return action.sequence;
    default:
      return state;
  }
}