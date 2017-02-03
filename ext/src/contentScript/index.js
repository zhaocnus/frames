import { SHOW_CAPTURE_UI, REMOVE_CAPTURE_UI } from '../constants/messageTypes';
import { mount, unmount } from './bootstrap';

// content script styles
import './index.scss';

// message listener
chrome.runtime.onMessage.addListener(
  function(request, sender, response) {
    switch (request.type) {
      case SHOW_CAPTURE_UI:
        mount();
        break;
      case REMOVE_CAPTURE_UI:
        unmount();
        break;
    }

    response();
  }
);