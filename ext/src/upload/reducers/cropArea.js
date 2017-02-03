import { LOCAL_SEQUENCE_LOADED } from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case LOCAL_SEQUENCE_LOADED:
      return Object.assign({}, action.cropArea);
    default:
      return state;
  }
}