import React, { PropTypes } from 'react';
import SimpleButton from '../../common/SimpleButton';
import DownloadAnchor from '../../common/DownloadAnchor';
import GfycatWrapperContainer from '../../containers/GfycatWrapperContainer';

const GifPanel = (props) => {
  // dowbload button
  const downloadBtn = props.imageMeta.fetchUrl ?
    <DownloadAnchor url={props.imageMeta.fetchUrl} text="Download GIF"/> :
    null;
  
  // convert button
  const isFetching = props.imageMeta.isFetching;
  const convertBtn = (
    <SimpleButton 
      text={isFetching ? 'Converting...' : 'Convert to GIF' }
      types={['primary', 'block']}
      disabled={isFetching}
      onClick={isFetching ? null : props.convert} />
  );

  return (
    <div>
      {convertBtn}
      {downloadBtn}
      <GfycatWrapperContainer />
    </div>
  );
};

GifPanel.propTypes = {
  convert: PropTypes.func.isRequired,
  imageMeta: PropTypes.object.isRequired
};

export default GifPanel