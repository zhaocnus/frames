import { 
  CONVERSION_STARTED, 
  CONVERSION_SUCCEEDED,
  GFYCAT_CREATION_PROPS_UPDATED 
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case CONVERSION_STARTED:
      return Object.assign({}, { isFetching: true, fetchUrl: null });
    case CONVERSION_SUCCEEDED:
      return Object.assign({}, action.imageMeta, { isFetching: false });
    case GFYCAT_CREATION_PROPS_UPDATED:
      return Object.assign({}, action.gfycatCreationProps);
    default:
      return state;
  }
}