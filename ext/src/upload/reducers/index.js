import { combineReducers } from 'redux';
import sequence from './sequence';
import cropArea from './cropArea';
import imageMeta from './imageMeta';
import user from './user';
import currentTool from './currentTool';
import drawSettings from './drawSettings';
import filterSettings from './filterSettings';
import gfycatMeta from './gfycatMeta';

const rootReducer = combineReducers({
  sequence: sequence,
  cropArea: cropArea,
  imageMeta: imageMeta,

  // Gfycat endpoint meta data 
  gfycatMeta: gfycatMeta,

  // Gfycat user
  user: user,

  // current tool
  currentTool: currentTool,

  // image processing settings
  drawSettings: drawSettings,

  filterSettings: filterSettings
});

export default rootReducer