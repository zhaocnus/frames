import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import AppWrapper from './components/AppWrapper';

const ROOT_ELEMENT_ID = 'xyz-gif-create-app-root';

export function unmount() {
  // remove old element if there is any
  const appRootEl = document.getElementById(ROOT_ELEMENT_ID);

  if (appRootEl) {
    unmountComponentAtNode(appRootEl);
    document.body.removeChild(appRootEl);
  }
}

/**
 * create new root element
 */
function createRootElm() {
  const appRootEl = document.createElement('div');

  appRootEl.id = ROOT_ELEMENT_ID;
  appRootEl.className = ROOT_ELEMENT_ID;
  document.body.appendChild(appRootEl);
}

export function mount() {
  unmount();
  createRootElm();

  render((
    <AppWrapper />
  ), document.getElementById(ROOT_ELEMENT_ID));
}

