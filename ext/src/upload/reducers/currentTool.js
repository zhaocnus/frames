import { 
  TOOL_SELECTED 
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case TOOL_SELECTED:
      return Object.assign({}, state, { id: action.toolId });
    default:
      return state;
  }
}