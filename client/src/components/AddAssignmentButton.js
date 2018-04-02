import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AddAssignmentDialogue from './AddAssignmentDialogue';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  button: {
    float: 'right'
  },
});

class AddAssignmentButton extends React.Component {
  state = { open: false };
  render() {
    const { classes } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <Tooltip id="tooltip-icon" title="Add Assignment">
          <Button
            variant="fab"
            mini
            color="secondary"
            aria-label="add"
            className={classes.button}
            onClick={() => this.setState({ open: true })}
          >
            <Icon className="material-ui">add</Icon>
          </Button>
        </Tooltip>
        <AddAssignmentDialogue
          isOpen={this.state.open}
          closeDialogue={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}
AddAssignmentButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAssignmentButton);
