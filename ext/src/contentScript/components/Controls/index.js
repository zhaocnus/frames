import React, { PropTypes } from 'react';
import Button from '../Button';

const Controls = props => (
  <div
    className="controls"
    style={{ top: props.top + 'px' }}>
    { 
    /*
    <Button
      text="Settings"
      onClick={props.showSettings} />
    */ 
    }
    <Button
      text={props.isRecording ? 'Done' : 'Start'}
      onClick={props.isRecording ? props.stop : props.start} />
  </div>
);

Controls.propTypes = {
  top: PropTypes.number.isRequired,
  isRecording: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired
};

Controls.defaultProps = {
  isRecording: false,
  top: 0
};

export default Controls