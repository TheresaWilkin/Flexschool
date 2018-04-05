import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import colors from './colors';
import { Mutation } from 'react-apollo';
import assignColor from '../mutations/AssignColor';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    color: 'pink',
  };

  renderColor(value) {
    const color = colors[value].color;
    return (
      <div style={{ backgroundColor: color, width: 25, height: 25, borderRadius: 20 }} />
    )
  }

  componentDidMount() {
    if (this.props.color) {
      this.setState({ color: this.props.color });
    }
  }

  handleChange = (color) => {
    this.setState({ color });
  };

  render() {
    const { classes, id } = this.props;
    const refetchQueries = [];
    return (
      <Mutation mutation={assignColor} refetchQueries={refetchQueries}>
        {(assignColor, { loading, error }) => (
          <div className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="color">Favorite Color</InputLabel>
              <Select
                value={this.state.color}
                renderValue={value => this.renderColor(value)}
                onChange={({ target }) => {
                  assignColor({ variables: { color: target.value, id: id }});
                  this.handleChange(target.value);
                }}
                inputProps={{
                  name: 'color',
                  id: 'color',
                }}
              >
                {Object.keys(colors).map(color => (
                  <MenuItem key={color} value={color}>{this.renderColor(color)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </Mutation>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
