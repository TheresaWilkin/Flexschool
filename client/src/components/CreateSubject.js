import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import mutation from '../mutations/CreateSubject';
import query from '../queries/Student';
import Gradebook from '../queries/Gradebook';
import Errors from './Errors';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


class Student extends Component {
  state = {
    subject: ''
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="subject"
          label="New Subject"
          className={classes.textField}
          value={this.state.subject}
          onChange={({ target }) => this.setState({ subject: target.value })}
          margin="normal"
        />
        <Mutation
          mutation={mutation}
          refetchQueries={[{ query, variables: this.props.match.params }, { query: Gradebook }]}
        >
          {(createSubject, { loading, error, data, called }) => (
            <div style={{ display: 'inline-block' }}>
              {loading ? <CircularProgress className={classes.progress} /> :
              <Button variant="raised" color="secondary" onClick={() => {
                createSubject({ variables: { name: this.state.subject, student: this.props.match.params.id } });
                this.setState({ subject: '' });
              }}>
                Add Subject
              </Button>}
              <Errors error={error} />
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Student));
