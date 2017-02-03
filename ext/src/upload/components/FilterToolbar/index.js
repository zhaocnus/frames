import React, { PropTypes } from 'react';
import ButtonGroup from '../../common/ButtonGroup';
import ToggleButton from '../../common/ToggleButton';
import { FILTERS_BY_ID, FILTER_IDS } from '../../constants';

const FilterToolbar = ({ filterSettings, selectFilter }) => (
  <div className="filter-toolbar">
    <ButtonGroup size="sm">
      {
        FILTER_IDS.map(id => {
          const filter = FILTERS_BY_ID[id];
          
          return (
            <ToggleButton
              key={id}
              selected={filterSettings.filterId === id}
              text={filter.name}
              disabled={filterSettings.isApplying}
              onClick={() => selectFilter(id)} />
          );
        })
      }
    </ButtonGroup>
  </div>
);

FilterToolbar.propTypes = {
  filterSettings: PropTypes.shape({
    filterId: PropTypes.string
  }).isRequired,
  selectFilter: PropTypes.func.isRequired
};

export default FilterToolbar