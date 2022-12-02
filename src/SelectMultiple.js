import React, {useEffect, useState, memo} from 'react';
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

const SelectMultiple = ({ filterType, filterProp, filterOptions, applyFilters }) => {

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    applyFilters(filterProp, filters)
  }, [filters, applyFilters, filterType, filterProp])

  const handleChange = (e) => {
    const value = e.target.value
    setFilters(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <div style={{margin: '20px 20px 20px 0'}}>
      <FormControl fullWidth>
        <InputLabel style={{paddingLeft: 10}}>{ filterType }</InputLabel>
        <Select
          multiple
          onClose={() => {applyFilters(filterProp, filters)}}
          value={filters}
          onChange={handleChange}
          input={<OutlinedInput label={ filterType } />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {filterOptions.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={filters?.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default memo(SelectMultiple)