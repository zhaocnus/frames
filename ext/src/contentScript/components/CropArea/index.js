import React, { Component, PropTypes } from 'react';
import Controls from '../Controls';
import { sendToBackground } from '../../../shared';
import { START_CAPTURE, STOP_CAPTURE } from '../../../constants/messageTypes';

class CropArea extends Component {
  constructor(props) {
    super(props);

    this.state = { isRecording: false };
    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._showSettings = this._showSettings.bind(this);
    this._isRecording = false;
  }

  render() {
    return (
      <div
        className="crop-area"
        style={{
          top: this.props.top + 'px',
          left: this.props.left + 'px',
          width: this.props.width + 'px',
          height: this.props.height + 'px'
        }}
        onMouseDown={e => e.stopPropagation()} >
        <Controls
          isRecording={this.state.isRecording}
          start={this._start}
          stop={this._stop}
          showSettings={this._showSettings}
          top={this.props.height} />
      </div>
    );
  }

  _start() {
    if (this.state.isRecording) return;

    this.setState({ isRecording: true });
    sendToBackground({ type: START_CAPTURE }, () => {});

    this.props.onStart();
  }

  _stop() {
    this.setState({ isRecording: false });

    const pixelRatio = window.devicePixelRatio;

    sendToBackground({
      type: STOP_CAPTURE,
      cropArea: {
        top: this.props.top,
        left: this.props.left,
        width: this.props.width ,
        height: this.props.height,
        pixelRatio: pixelRatio || 1
      }
    }, () => {});

    this.props.onStop();
  }

  _showSettings() {
    console.log('show settings');
  }
}

CropArea.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default CropArea