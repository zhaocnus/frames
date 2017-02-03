import { hasChromeRuntimeError, sendToContentScript } from '../shared';
import { SHOW_CAPTURE_UI, REMOVE_CAPTURE_UI } from '../constants/messageTypes';

const INTERVAL = 33;
let _timer;
let _windowId;
let _images;

/**
 * capture screen shot and save to localstorage
 */
function capture(cb) {
  chrome.tabs.captureVisibleTab(_windowId, {}, dataUrl => {
    if (hasChromeRuntimeError(cb)) return;

    _images.push(dataUrl);
    cb();
  });
}

/**
 * show capture result
 */
export function showUploadPage(err) {
  const url = err ?
    `chrome-extension://${chrome.runtime.id}/index_upload.html?err=${err.message}` :
    `chrome-extension://${chrome.runtime.id}/index_upload.html`;

  chrome.tabs.create({ url: url });
}

/**
 * init capture
 */
export function init(windowId, cb) {
  clearTimeout(_timer);
  _windowId = windowId;
  _images = [];

  chrome.storage.local.remove(['sequence', 'cropArea'], () => {
    if (hasChromeRuntimeError(cb)) return;
    cb();
  });
}

/**
 * remove capture UI in content script
 */
export function removeCaptureUI(cb) {
  sendToContentScript({ type: REMOVE_CAPTURE_UI }, err => {
    if (err) return cb(err);

    cb();
  });
}


/**
 * show capture UI in content script
 */
export function showCaptureUI(cb) {
  sendToContentScript({ type: SHOW_CAPTURE_UI }, err => {
    if (err) return cb(err);

    cb();
  });
}

/**
 * start capture
 */
export function start() {
  clearTimeout(_timer);

  capture(err => {
    if (err) {
      showUploadPage(err);
      return
    }

    _timer = setTimeout(() => {
      start();
    }, INTERVAL);
  });
}

/**
 * stop capture
 */
export function stop({ cropArea }) {
  clearTimeout(_timer);

  chrome.storage.local.set({
    sequence: _images,
    cropArea: cropArea
  }, () => {
    const err = hasChromeRuntimeError();
    _images = null;
    showUploadPage(err);
  });
}