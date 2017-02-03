import React, { PropTypes } from 'react';

const ButtonIcon = ({ type }) => (
  <span
    className={'glyphicon glyphicon-' + type}
    style={{ marginRight: '5px' }}/>
);

ButtonIcon.propTypes = {
  type: PropTypes.string.isRequired
}

export default ButtonIcon