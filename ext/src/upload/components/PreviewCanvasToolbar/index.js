import React, { PropTypes } from 'react';
import ToggleButton from '../../common/ToggleButton';
import ButtonIcon from '../../common/ButtonIcon';
import DrawToolbarContainer from '../../containers/DrawToolbarContainer';
import FilterToolbarContainer from '../../containers/FilterToolbarContainer';
import AdjustBtns from './AdjustBtns';
import ResetBtns from './ResetBtns';
import { TOOLS_BY_ID, TOOL_IDS } from '../../constants';

const PreviewCanvasToolbar = ({ currentTool, selectTool, newToolSelected }) => {
  let tools = null;

  switch (currentTool.id) {
    case '1':
      tools = <DrawToolbarContainer />;
      break;
    case '2':
      tools = <FilterToolbarContainer />;
      break;
    case '3':
      tools = <AdjustBtns />;
      break;
    case '4':
      tools = <ResetBtns />;
      break;
  }

  return (
    <div className="preview-canvas-toolbar clearfix">
      {
        TOOL_IDS.map(toolId => {
          const tool = TOOLS_BY_ID[toolId];

          return (
            <ToggleButton
              key={toolId}
              icon={<ButtonIcon type={tool.icon} />}
              text={tool.name}
              selected={currentTool.id === toolId}
              pullRight={tool.pullRight}
              onClick={
                () => {
                  const id = toolId === currentTool.id ? null : toolId;

                  selectTool(id);

                  // TODO: this might not be nesessary
                  if (id) newToolSelected();
                }
              } />
          );
        })
      }
      {tools}
    </div>
  );
};

PreviewCanvasToolbar.propTypes = {
  currentTool: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  selectTool: PropTypes.func.isRequired,
  newToolSelected: PropTypes.func.isRequired
};

export default PreviewCanvasToolbar