function httpErrorHandler(err, res) {
  if (err) {
    return err;
  }

  // handle errors
  if (!res.ok) {
    switch (res.type) {
      case 'text/html':
        return res.status + ' ' + res.text;
      case 'application/json':
        return res.status + ' ' + JSON.parse(res.text).message;
      default:
        return res.status + '';
    }   
  } 

  // no error
  return false;
}

export function handleResponse(cb) {
  return function(err, res) {
    const error = httpErrorHandler(err, res);

    if (error) {
      cb(error);
    } else {
      cb(null, JSON.parse(res.text));
    }
  };
}

export function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}