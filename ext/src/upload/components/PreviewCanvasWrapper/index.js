import React, { Component, PropTypes } from 'react';
import PreviewCanvasContainer from '../../containers/PreviewCanvasContainer';
import PreviewControls from '../PreviewControls';
import PreviewCanvasToolbarContainer from '../../containers/PreviewCanvasToolbarContainer';

class PreviewCanvasWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.autoplay,
      frame: 0
    };

    this._toggle = this._toggle.bind(this);
    this._pause = this._pause.bind(this);
    this._play = this._play.bind(this);
    this._onSliderChange = this._onSliderChange.bind(this);
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this._play();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      this._play();
    }
  }

  render() {
    return (
      <div className="preview-canvas-wrapper">
        <PreviewCanvasContainer
          width={this.props.cropArea.width}
          height={this.props.cropArea.height}
          base64={this.props.sequence[this.state.frame]}
          frame={this.state.frame} />
        <PreviewCanvasToolbarContainer 
          newToolSelected={this._pause} />
        <PreviewControls
          isPlaying={this.state.isPlaying}
          onToggle={this._toggle}
          onSliderChange={this._onSliderChange}
          min={1}
          max={this.props.sequence.length}
          value={this.state.frame + 1} />
      </div>
    );
  }

  _showNextFrame() {
    // play next frame
    let frame = this.state.frame + 1;

    if (frame >= this.props.sequence.length) {
      frame = 0;
    }

    this.setState({ frame: frame });
  }

  _toggle() {
    clearTimeout(this._timer);

    const isPlaying = !this.state.isPlaying;

    this.setState({ isPlaying: isPlaying });

    if (isPlaying) {
      this._play();
    }
  }

  _pause() {
    clearTimeout(this._timer);
    this.setState({ isPlaying: false });
  }

  _play() {
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      this._showNextFrame();
    }, 33);
  }

  // When slider changes, stop the animation and go to that frame
  _onSliderChange(frame) {
    clearTimeout(this._timer);

    this.setState({
      isPlaying: false,
      frame: frame - 1 // starting index of the slider is 1
    });
  }
}

PreviewCanvasWrapper.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.string).isRequired,
  cropArea: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  autoplay: PropTypes.bool.isRequired
};

PreviewCanvasWrapper.defaultProps = {
  autoplay: false
};

export default PreviewCanvasWrapper