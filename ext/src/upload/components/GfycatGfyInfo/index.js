import React, { PropTypes } from 'react';
import { GFYCAT_URL } from '../../constants';

const GfycatGfyInfo = ({ user, gfycatMeta }) => {
  return (user.url && gfycatMeta.gfyname) ?
    (
      <div className="gfycat-gfy-info">
        <a 
          href={user.url} 
          target="_blank" 
          className="btn btn-success btn-block">You library
        </a>
        <a 
          href={GFYCAT_URL + gfycatMeta.gfyname} 
          target="_blank"
          className="btn btn-success btn-block">Gfy direct url
        </a>
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>Slack</h4>
            <p>
              <small>{'/gfycat ' + gfycatMeta.gfyname}</small>
            </p>
          </div>
        </div>
      </div>
    ) : null;
};

GfycatGfyInfo.propTypes = {
  user: PropTypes.object.isRequired,
  gfycatMeta: PropTypes.object.isRequired
};

export default GfycatGfyInfo