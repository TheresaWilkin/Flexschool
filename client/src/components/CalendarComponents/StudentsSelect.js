import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Chip from 'material-ui/Chip';
import { Query } from 'react-apollo';
import query from '../../queries/StudentList';
import Errors from '../Errors';

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

class MultipleSelect extends React.Component {
  render() {
    const { classes, theme, hiddenStudents, onChange } = this.props;
    return (
      <Query query={query}>
        {({ data, error, loading }) => {
          if (error) { return <Errors error={error} />; }
          if (loading) { return null; }
          const { students } = data.user;
          return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="students-multiple-select">Hidden Students</InputLabel>
                <Select
                  multiple
                  value={hiddenStudents}
                  onChange={onChange}
                  input={<Input id="students-multiple-select" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => <Chip key={value} label={students.find(s => s.id === value).name} className={classes.chip} />)}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {students.map(({ id, name }) => (
                    <MenuItem
                      key={id}
                      value={id}
                      style={{
                        fontWeight:
                          hiddenStudents.indexOf(id) === -1
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium,
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          )
        }}
      </Query>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
