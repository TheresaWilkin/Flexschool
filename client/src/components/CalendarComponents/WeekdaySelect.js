import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    maxWidth: 350,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const menuItems = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const chipLabels = [
  'S', 'M', 'T', 'W', 'Th', 'F', 'Sa'
];

class MultipleSelect extends React.Component {
  render() {
    const { classes, theme, weekdays, onChange } = this.props;

    return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="weekdays-multiple-select">Displayed Weekdays</InputLabel>
          <Select
            multiple
            value={weekdays}
            onChange={onChange}
            input={<Input id="weekdays-multiple-select" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => <Chip key={value} label={chipLabels[value]} className={classes.chip} />)}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {menuItems.map((day, i) => (
              <MenuItem
                key={day}
                value={i}
                style={{
                  fontWeight:
                    weekdays.indexOf(i) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
