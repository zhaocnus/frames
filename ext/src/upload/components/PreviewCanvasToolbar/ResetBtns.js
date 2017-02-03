import React, { PropTypes } from 'react';
import SimpleButton from '../../common/SimpleButton';

const ResetBtns = () => (
  <div className="text-right">
     <SimpleButton
      size="sm"
      text="Yes"
      type="danger"
      onClick={() => {}} />
    <SimpleButton
      size="sm"
      text="No"
      type="default"
      onClick={() => {}} />
  </div>
);

ResetBtns.propTypes = {
  foo: PropTypes.string
};

export default ResetBtns