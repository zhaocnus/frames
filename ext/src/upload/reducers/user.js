import {  
  GFYCAT_AUTH_SUCCEEDED,
  GFYCAT_AUTH_FAILED,
  GFYCAT_USER_INFO_FETCHED
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case GFYCAT_USER_INFO_FETCHED:
      return Object.assign({}, state, action.user, { err: null });
    case GFYCAT_AUTH_SUCCEEDED:
      return { err: null };
    case GFYCAT_AUTH_FAILED:
      return { err: action.err || 'Error' };
    default:
      return state;
  }
}