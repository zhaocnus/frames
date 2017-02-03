import superagent from 'superagent';
import waterfall from 'async/waterfall';
import doUntil from 'async/doUntil';
import { hasChromeRuntimeError } from '../../shared';
import { handleResponse, getParameterByName } from './utils';
import { gfycat as GFYCAT_CONFIG } from '../../../config.json';

let _token; // cache user token in memory

/**
 *
 */
export function requestAuth(cb) { 
  const url = 'https://gfycat.com/oauth/authorize' +
    '?client_id=' + GFYCAT_CONFIG.client_id +
    '&redirect_uri=' +
      encodeURIComponent(`https://${chrome.runtime.id}.chromiumapp.org/provider_cb`) +
    '&scope=all' +
    '&state=' + GFYCAT_CONFIG.state +
    '&response_type=token';

  // clear cache
  _token = null;

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

      _token = token;
      cb(null, token);
    });
  });
}

/**
 *
 */
export function getUserToken(cb) {
  if (_token) return cb(null, _token);

  chrome.storage.local.get('gfycat_user_token', itemsByKey => {
    if (hasChromeRuntimeError(cb)) return;

    if (!itemsByKey.gfycat_user_token) {
      return cb('Not authorized');
    }

    _token = itemsByKey.gfycat_user_token;
    cb(null, itemsByKey.gfycat_user_token);
  });
}

/**
 *
 */
export function getMe(callback) {
  waterfall([
    getUserToken,
    
    (token, cb) => {
      superagent
        .get('https://api.gfycat.com/v1/me')
        .set('Authorization', 'Bearer ' + token)
        .end(handleResponse(cb));
    }
  ], (err, me) => {
    if (err) {
      _token = null;
      return callback(err);
    }

    callback(null, me);
  });
}

/**
 *
 */
export function removeUserToken(callback) {
  _token = null;

  chrome.storage.local.remove('gfycat_user_token', () => {
    if (hasChromeRuntimeError(callback)) return;

    callback();
  });
}

/**
 *
 */
export function createGif(imageMeta, cb) {
  superagent
    .post('https://api.gfycat.com/v1/gfycats')
    .set('Authorization', 'Bearer ' + _token)
    .send(
      Object.assign({}, imageMeta, {
        noMd5: true
      })
    )
    .end(handleResponse(cb));
}

/**
 *
 */
export function checkCreationStatus(gfyname, callback) {
  const check = cb => {
    superagent
      .get('https://api.gfycat.com/v1/gfycats/fetch/status/' + gfyname)
      .set('Authorization', 'Bearer ' + _token)
      .end(handleResponse(cb));
  };
  let timer;

  // keep calling status api until response is 'complete'
  doUntil(
    (next) => {
      clearTimeout(timer);

      check((err, res) => {
        if (res.task === 'complete') {
          next(null, true);
        } else if (res.task === 'NotFoundo') {
          next('Not found');
        } else {
          timer = setTimeout(() => next(), 300);
        }      
      });
    },
    completed => completed,
    err => {
      if (err) return callback(err);

      callback();
    }
  );
}
