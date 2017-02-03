import React, { PropTypes } from 'react';

const DownloadAnchor = ({ url, text }) => (
  <a
    className="btn btn-success btn-block"
    href={url}
    download >
    {text}
  </a>
);

DownloadAnchor.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default DownloadAnchor