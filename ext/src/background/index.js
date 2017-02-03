import series from 'async/series';
import {
  init,
  showCaptureUI,
  removeCaptureUI,
  start,
  stop,
  showNewTab
} from './capture';
import setIcon from './icon';
import { START_CAPTURE, STOP_CAPTURE } from '../constants/messageTypes';

let _active = false;

// browserAction listener
chrome.browserAction.onClicked.addListener(tab => {
  _active = !_active;

  setIcon(_active, tab.id);

  if (_active) {
    series([
      cb => init(tab.windowId, cb),
      cb => showCaptureUI(cb)
    ], err => {
      if (err) return showNewTab(err);
    });
  } else {
     series([
      cb => init(tab.windowId, cb),
      cb => removeCaptureUI(cb)
    ], err => {
      if (err) console.log(err);
    });
  }
});


// listen to events sent from content script
chrome.runtime.onMessage.addListener((request, sender, response) => {
  switch (request.type) {
    case START_CAPTURE:
      start();
      break;
    case STOP_CAPTURE:
      stop(request);
      break;
  }

  response();
});