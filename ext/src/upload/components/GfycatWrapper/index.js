import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import GfycatUploadForm from '../GfycatUploadForm';
import GfycatUserInfoContainer from '../../containers/GfycatUserInfoContainer';

const GfycatWrapper = ({ user, imageMeta, gfycatMeta, gfycatCreate,updateImageMeta }) => (
  <div className="gfycat-wrapper">
    <div className="panel panel-default">
      <div className="panel-body">
        <GfycatUserInfoContainer />
        {
          (isEmpty(user) || user.err || !imageMeta.fetchUrl) ?
            null : 
            (
              <GfycatUploadForm
                imageMeta={imageMeta}
                gfycatMeta={gfycatMeta}
                onChange={updateImageMeta}  
                onSubmit={gfycatCreate} />
            )
        }
      </div>
    </div>
  </div>
);

GfycatWrapper.propTypes = {
  user: PropTypes.object.isRequired,
  imageMeta: PropTypes.object.isRequired,
  gfycatMeta: PropTypes.object.isRequired,

  // functions
  gfycatCreate: PropTypes.func.isRequired,
  updateImageMeta: PropTypes.func.isRequired
};

export default GfycatWrapper