import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MainAppContainer from './containers/MainAppContainer';
import configureStore from './store/config';
import { STROKE_WIDTHS, STROKE_COLORS } from './constants';

// scss
import './styles/index.scss';

// redux store
const store = configureStore({
  drawSettings: {
    strokeWidth: STROKE_WIDTHS[0],
    strokeColor: STROKE_COLORS[0]
  },
  filterSettings: {
    filterId: 'none'
  }
});

// render React app
render((
  <Provider store={store}>
    <MainAppContainer />
  </Provider>
), document.getElementById('app-root'));