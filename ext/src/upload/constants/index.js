export const SERVER_URL = 'http://localhost:3333';
export const GFYCAT_URL = 'https://gfycat.com/';

// tools
export const TOOLS_BY_ID = {
  '1': {
    name: 'Draw', 
    icon: 'pencil'
  },
  '2': {
    name: 'Filters', 
    icon: 'picture'
  },
  '3': {
    name: 'Adjust', 
    icon: 'adjust'
  },
  '4': {
    name: 'Reset', 
    icon: 'repeat',
    pullRight: true
  }
};

export const TOOL_IDS = ['1', '2', '3', '4'];

// draw settings
export const STROKE_WIDTHS = [10, 15, 20];
export const STROKE_COLORS = ['#f04953', '#ffd144', '#01a982'];

// filters
// NOTE: Except for 'None', object key must match Caman filter methods
export const FILTERS_BY_ID = {
  none: {
    name: 'None'
  },
  desaturate: {
    name: 'Desaturate'
  },
  vintage: {
    name: 'Vintage'
  },
  lomo: {
    name: 'Lomo'
  },
  clarity: {
    name: 'Clarity'
  },
  sinCity: {
    name: 'Sin city'
  }
};
export const FILTER_IDS = ['none', 'desaturate', 'vintage', 'lomo', 'clarity', 'sinCity'];
