import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withStyles } from 'material-ui/styles';
import mutation from '../mutations/CreateFeedback';
import query from '../queries/Feedback';
import Errors from './Errors';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedback: '',
      snackbar: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ snackbar: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="feedback"
          label="Feedback"
          className={classes.textField}
          value={this.state.feedback}
          onChange={({ target }) => this.setState({ feedback: target.value })}
          margin="normal"
        />
        <Mutation
          mutation={mutation}
          refetchQueries={[{ query }]}
        >
          {(createFeedback, { loading, error, data, called }) => (
            <div style={{ display: 'inline-block' }}>
              {loading ? <CircularProgress className={classes.progress} /> :
              <Button variant="raised" color="secondary" onClick={() => {
                createFeedback({ variables: { feedback: this.state.feedback } });
                this.setState({ feedback: '', snackbar: true });
              }}>
                Add Feedback
              </Button>}
              <Errors error={error} />
            </div>
          )}
        </Mutation>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbar}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Feedback submitted. You will receive an email response.</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Feedback);
