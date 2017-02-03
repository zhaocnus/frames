import superagent from 'superagent';
import mapSeries from 'async/mapSeries';
import waterfall from 'async/waterfall';
import _ from 'lodash';
import { hasChromeRuntimeError } from '../../shared';
import { SERVER_URL } from '../constants';
import { handleResponse } from './utils';

// this is the ORIGGINAL base64 sequence
let _sequence = [];

// draw layer base64 string
let _drawLayer;

/**
 * get cropped sequence
 */
function getCroppedSequence({ sequence, cropArea }, callback) {
  const canvas = document.getElementById('hidden-canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  const pixelRatio = cropArea.pixelRatio;

  // set canvas width and height
  canvas.width = cropArea.width;
  canvas.height = cropArea.height;

  // crop all sequence
  mapSeries(sequence, (base64Str, cb) => {
    img.onload = () => {
      ctx.drawImage(
        img,
        // source
        cropArea.left * pixelRatio, 
        cropArea.top * pixelRatio, 
        cropArea.width * pixelRatio, 
        cropArea.height * pixelRatio,
        // destination (canvas)
        0, 0, canvas.width, canvas.height
      );
      cb(null, canvas.toDataURL('image/jpeg'));
    };
    img.src = base64Str;
  }, (err, croppedSequence) => {
    callback(null, croppedSequence);
  });
}

function applyDrawLayerToFrame(img, canvas, ctx) {
  return function(frameBase64, callback) {
    waterfall([
      // first draw frame
      cb => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          cb();
        };
        img.src = frameBase64;
      },
      // then draw the draw layer
      cb => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          cb(null, canvas.toDataURL('image/jpeg'));
        };
        img.src = _drawLayer;
      }
    ], (err, resultBase64) => {
      callback(null, resultBase64);
    });
  };
}

/**
 * 
 */
function applyDrawLayerToSequence(callback) {
  if (!_drawLayer) return callback(null, _sequence);

  const canvas = document.getElementById('hidden-canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  mapSeries(_sequence, applyDrawLayerToFrame(img, canvas, ctx), (err, newSequence) => {
    callback(null, newSequence);
  });
}

/**
 * Fetch data from localstorage
 */
export function getSequenceFromLocalStorage(cb) {
  chrome.storage.local.get(['sequence', 'cropArea'], itemsByKey => {
    if (hasChromeRuntimeError(cb)) return;

    // validation
    if (_.isEmpty(itemsByKey.sequence) || !Array.isArray(itemsByKey.sequence)) return cb('Not a valid sequence');
    if (_.isEmpty(itemsByKey.cropArea)) return cb('Invalid crop area');

    // NOTE: itemsByKey is an object
    getCroppedSequence(itemsByKey, (err, croppedSequence) => {
      // save sequence to memory
      _sequence = croppedSequence.slice(0); // clone

      cb(null, {
        cropArea: itemsByKey.cropArea,
        sequence: croppedSequence
      });
    });
  });
}

/**
 * Update draw layer
 */
export function updateDrawLayer(dataUrl) {
  _drawLayer = dataUrl;
}

/**
 * Update draw layer
 */
export function uploadSequenceToServer(callback) {
  waterfall([
    applyDrawLayerToSequence,
    (sequence, cb) => {
      superagent.post(SERVER_URL + '/api/gif')
        .send({ sequence: sequence })
        .end(handleResponse(cb));
    }
  ], (err, imageMeta) => {
    if (err) return callback(err);

    callback(null, imageMeta);
  });
}

function RGBtoGRAYSCALE(r, g, b) {
  return window.parseInt((0.2125 * r) + (0.7154 * g) + (0.0721 * b), 10);
}

function desaturate(ctx, width, height) {
  const imgData = ctx.getImageData(0, 0, width, height);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (y * width + x) * 4;
      
      // Apply Monochrome level across all channels:
      imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = 
        RGBtoGRAYSCALE(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]);
    }
  }
  
  return imgData;
}



/**
 * 
 */
export function applyFilterToSequence(filterId, callback) {
  const canvas = document.getElementById('hidden-canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  mapSeries(_sequence, (frameBase64, next) => {
    if (filterId === 'none') {
      return next(null, frameBase64);
    }

    img.onload = () => { 
      ctx.drawImage(img, 0, 0);
      ctx.putImageData(
        desaturate(ctx, canvas.width, canvas.height),
        0, 0
      );

      next(null, canvas.toDataURL('image/jpeg'));
    };

    img.src = frameBase64;
  }, (err, newSequence) => {
    callback(null, newSequence);
  });
}








