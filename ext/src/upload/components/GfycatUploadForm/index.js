import React, { PropTypes } from 'react';
import GfycatGfyInfoContainer from '../../containers/GfycatGfyInfoContainer';

const GfycatUploadForm = ({ gfycatMeta, imageMeta, onChange, onSubmit }) => {
  const disabled = gfycatMeta.isCreating || gfycatMeta.gfyname;

  return (
    <form className="gfycat-upload-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Grumpy cat"
          disabled={disabled}
          value={imageMeta.title}
          onChange={e => onChange({ title: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="This is very angry cat"
          disabled={disabled}
          value={imageMeta.description}
          onChange={e => onChange({ description: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Safe for work</label>
        <select className="form-control">
          <option value="0">Clean</option>
          <option value="1">Adult</option>
          <option value="3">Possibly Offensive</option>
        </select>
      </div>

      {
        gfycatMeta.gfyname ?
          (
            <GfycatGfyInfoContainer />
          ) :
          (
            <button
              type="button"
              className="btn btn-info pull-right"
              disabled={disabled}
              onClick={onSubmit}>
              { gfycatMeta.isCreating ? 'Uploading...' : 'Upload'}
            </button>
          )
      }     
      {
        gfycatMeta.err ?
          <p className="bg-danger">{gfycatMeta.err}</p> : null
      }
    </form>
  );
};

GfycatUploadForm.propTypes = {
  imageMeta: PropTypes.object.isRequired,
  gfycatMeta: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default GfycatUploadForm