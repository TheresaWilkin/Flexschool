import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  menu: {
    width: 250,
  },
});

class SelectStudent extends React.Component {
  render() {
    const { classes, value, handleChange, students, nullable } = this.props;
    return (
        <TextField
          id="select-student"
          select
          label="Student"
          className={classes.textField}
          value={value}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {nullable &&
            <MenuItem value="">
              <em>All</em>
            </MenuItem>}
          {students.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
    );
  }
}

export default withStyles(styles)(SelectStudent);
