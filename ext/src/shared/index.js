export function hasChromeRuntimeError(cb) {
  if (chrome.runtime.lastError) {
    const err = new Error(chrome.runtime.lastError.message);

    return cb ? true : cb(err);
  }

  return false;
}

export function sendToContentScript(message, cb) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, () => {
      if (hasChromeRuntimeError(cb)) return;

      cb();
    });
  });
}

export function sendToBackground(message, cb) {
  chrome.runtime.sendMessage(message, () => {
    if (hasChromeRuntimeError(cb)) return;

    cb();
  });
}