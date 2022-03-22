import React, {useEffect, useState} from 'react';
import {OutlinedInput, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  ListItemText,
  Select,
  Checkbox,
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

export function SelectMultiple({ filterType, filterOptions, filters, group, applyFilters }) {
  const activeFilters = filters.map((filter, i) => filter.name);
  const [checked, setChecked] = useState([])

  useEffect(() => {
    //here ??

  }, [checked])

  return (
    <div style={{margin: '20px 20px 20px 0'}}>
      <FormControl fullWidth>
        <InputLabel style={{paddingLeft: 10}}>{ filterType }</InputLabel>
        <Select
          multiple
          onClose={applyFilters}
          value={filters.map((item, i) => item.group === group && item.name)}
          input={<OutlinedInput label={ filterType } />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {filterOptions.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={activeFilters.indexOf(type) > -1} onChange={(e) => setChecked(type)}/>
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}