import React, { PropTypes } from 'react';
import ButtonGroup from '../../common/ButtonGroup';
import ToggleButton from '../../common/ToggleButton';
import Dot from './Dot';
import Color from './Color';
import { STROKE_WIDTHS, STROKE_COLORS } from '../../constants';

const DrawToolbar = ({ drawSettings, selectStrokeWidth, selectStrokeColor }) => (
  <div className="draw-toolbar">
    <ButtonGroup size="sm">
      {
        STROKE_WIDTHS.map((width, index) => (
          <ToggleButton
            key={index}
            selected={drawSettings.strokeWidth === width}
            icon={<Dot size={width} />}
            onClick={() => selectStrokeWidth(width)} />
        ))
      }
    </ButtonGroup>
    <ButtonGroup size="sm">
      {
        STROKE_COLORS.map((hex, index) => (
          <ToggleButton
            key={index}
            selected={drawSettings.strokeColor === hex}
            icon={<Color color={hex} />}
            onClick={() => selectStrokeColor(hex)} />
        ))
      }
    </ButtonGroup>
  </div>
);


DrawToolbar.propTypes = {
  drawSettings: PropTypes.shape({
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string
  }).isRequired,
  selectStrokeWidth: PropTypes.func.isRequired,
  selectStrokeColor: PropTypes.func.isRequired
};

export default DrawToolbar