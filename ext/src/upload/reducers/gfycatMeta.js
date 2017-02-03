import {  
  GFYCAT_CREATION_INITIATED,
  GFYCAT_CREATION_FAILED,
  GFYCAT_CREATION_SUCCEEDED 
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case GFYCAT_CREATION_INITIATED:
      return { isCreating: true };
    case GFYCAT_CREATION_FAILED:
      return { err: action.err || 'Error', isCreating: false };
    case GFYCAT_CREATION_SUCCEEDED:
      return { err: false, isCreating: false, gfyname: action.gfyname };
    default:
      return state;
  }
}