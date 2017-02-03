import React, { Component } from 'react';
import { ScreenTop, ScreenBottom, ScreenLeft, ScreenRight } from '../Screen';
import CropArea from '../CropArea';

class AppWrapper extends Component {
  constructor(props) {
    super(props);

    // event hanlders
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onCancel = this._onCancel.bind(this);

    // tags
    this._notDown = true;

    // state
    this.state = {};
  }

  render() {
    const hasCropArea = this.state.hasCropArea;
    let children = null;

    if (hasCropArea) {
      const top = Math.min(this.state.y1, this.state.y2);
      const bottom = Math.max(this.state.y1, this.state.y2);
      const left = Math.min(this.state.x1, this.state.x2);
      const right = Math.max(this.state.x1, this.state.x2);
      const height = bottom - top;

      children = (
        <div>
          <ScreenTop height={top} />
          <ScreenBottom top={bottom} />
          <ScreenLeft top={top} width={left} height={height} />
          <ScreenRight top={top} left={right} height={height} />
          <CropArea
            top={top}
            left={left}
            width={right - left}
            height={height}
            onStart={() => this.setState({ recording: true })}
            onStop={() => this.setState({ recording: false })} />
        </div>
      );
    }

    return (
      <div
        className={
          'app-wrapper' + 
          (hasCropArea ? ' has-crop-area' : '') +
          (this.state.recording ? ' recording' : '')
        }
        onMouseDown={this._onMouseDown}
        onMouseMove={this._onMouseMove}
        onMouseUp={this._onCancel}
        onMouseLeave={this._onCancel}>
        {children}
      </div>
    );
  }

  _onMouseDown(e) {
    if (e.button !== 0) return; // do nothing if not left click

    this._notDown = false;

    this.setState({
      hasCropArea: true,
      x1: Math.round(e.clientX),
      y1: Math.round(e.clientY),
      x2: Math.round(e.clientX),
      y2: Math.round(e.clientY)
    });
  }

  _onMouseMove(e) {
    if (this._notDown) return;

    this.setState({
      x2: Math.round(e.clientX),
      y2: Math.round(e.clientY)
    });
  }

  _onCancel() {
    this._notDown = true;
  }
}

export default AppWrapper