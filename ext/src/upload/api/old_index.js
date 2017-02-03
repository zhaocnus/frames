// import superagent from 'superagent';
import { hasChromeRuntimeError } from '../../shared';
import { SERVER_URL } from '../constants';
import { handleResponse } from './utils';
import { gfycat as GFYCAT_CONFIG } from '../../../config.json';

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 *
 */
export function requestGfycatAuth(cb) {
  const url = 'https://gfycat.com/oauth/authorize' +
    '?client_id=' + GFYCAT_CONFIG.client_id +
    '&redirect_uri=' +
      encodeURIComponent(`https://${chrome.runtime.id}.chromiumapp.org/provider_cb`) +
    '&scope=all' +
    '&state=' + GFYCAT_CONFIG.state +
    '&response_type=token';

  chrome.identity.launchWebAuthFlow({
    url: url,
    interactive: true
  }, redirectUri => {
    if (hasChromeRuntimeError(cb)) return;

    // redirectUrl is undefined is user close the auth window
    if (!redirectUri) {
      return cb('Invalid redirect uri');
    }

    const error = getParameterByName('error', redirectUri);
    if (error) {
      return cb(error);
    }

    if (getParameterByName('state', redirectUri) !== GFYCAT_CONFIG.state) {
      return cb('state is not correct');
    }

    // get token
    const token = redirectUri.split('#')[1].split('&')[0];
    
    // save token
    chrome.storage.local.set({ 'gfycat_user_token': token }, () => {
      if (hasChromeRuntimeError(cb)) return;

      cb(null, token);
    });
  });
}

// superagent
//   .get('https://api.gfycat.com/v1/me')
//   .set('Authorization', 'Bearer ' + _token)
//   .end((err, res) => {
//     console.log(err);
//     console.log(res);
//   });

/**
 *
 */
export function getToken(cb) {
  chrome.storage.local.get('gfycat_user_token', itemsByKey => {
    if (hasChromeRuntimeError(cb)) return;

    cb(null, itemsByKey.gfycat_user_token);
  });
}


