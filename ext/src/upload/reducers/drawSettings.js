import { 
  STROKE_WIDTH_SELECTED,
  STROKE_COLOR_SELECTED
} from '../constants/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case STROKE_WIDTH_SELECTED:
      return Object.assign({}, state, { strokeWidth: action.strokeWidth });
    case STROKE_COLOR_SELECTED:
      return Object.assign({}, state, { strokeColor: action.strokeColor });
    default:
      return state;
  }
}