import {
  LOCAL_SEQUENCE_LOADED,
  STROKE_WIDTH_SELECTED,
  STROKE_COLOR_SELECTED,
  TOOL_SELECTED,
  CONVERSION_STARTED,
  CONVERSION_SUCCEEDED,
  FILTER_SELECTED,
  FILTER_SUCCEEDED
} from '../constants/actionTypes';

export const localSequenceLoaded = ({ sequence, cropArea }) => ({
  type: LOCAL_SEQUENCE_LOADED,
  sequence,
  cropArea
});

// draw settings
export const strokeWidthSelected = strokeWidth => ({
  type: STROKE_WIDTH_SELECTED,
  strokeWidth
});

export const strokeColorSelected = strokeColor => ({
  type: STROKE_COLOR_SELECTED,
  strokeColor
});

// filter settings
export const filterSelected = filterId => ({
  type: FILTER_SELECTED,
  filterId
});

export const filterSucceeded = sequence => ({
  type: FILTER_SUCCEEDED,
  sequence
});

// select/unselect new tool
export const toolSelected = toolId => ({
  type: TOOL_SELECTED,
  toolId
});

// image conversion
export const conversionStarted = () => ({
  type: CONVERSION_STARTED
});

export const conversionSucceeded = imageMeta => ({
  type: CONVERSION_SUCCEEDED,
  imageMeta
});