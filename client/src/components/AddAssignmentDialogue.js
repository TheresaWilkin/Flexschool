import React from 'react';
import { Mutation } from 'react-apollo';
import createAssignment from '../mutations/CreateAssignment';
import updateAssignment from '../mutations/UpdateAssignment';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Errors from './Errors';
import SelectSubject from './SelectSubject';
import moment from 'moment';
import assignmentRefetchQueries from '../queries/assignmentRefetchQueries';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '250px'
  }
});

class AddAssignmentDialogue extends React.Component {
  state = {
    name: '',
    pointsAvailable: 100,
    subject: '',
    description: '',
    dueDate: moment().format("YYYY-MM-DDThh:mm")
  };

  componentDidMount() {
    if (this.props.subject) {
      this.setState({ subject: this.props.subject, student: this.props.student });
    }
    if (this.props.assignment) {
      const {
        assignment: {
          name, pointsAvailable, subject, description, dueDate, graded, pointsEarned, submitted
        },
      } = this.props;
      this.setState({
        name,
        pointsEarned,
        pointsAvailable,
        submitted,
        subject: subject.id,
        description,
        dueDate: moment(dueDate).format("YYYY-MM-DDThh:mm"),
        student: subject.student.id,
        graded
      });
    }
  }

  handleChange(type) {
    return ({ target }) => {
      this.setState({ [type]: target.value });
    }
  }

  renderSubmit() {
    const { edit, closeDialogue } = this.props;
    let refetchQueries = [];
    if (this.state.subject) {
      refetchQueries = assignmentRefetchQueries(this.state.subject);
    } else if (this.props.subject) {
      refetchQueries = assignmentRefetchQueries(this.props.subject);
    } else {
      refetchQueries = assignmentRefetchQueries();
    }
    if (edit) {
      return (
        <Mutation mutation={updateAssignment} refetchQueries={refetchQueries}>
          {(updateAssignment, { loading, error }) => (
            <div>
              <Button
                variant="raised"
                onClick={() => {
                  const { student, dueDate, ...assignment } = this.state;
                  updateAssignment({
                    variables: {
                      assignment: {
                        ...assignment,
                        dueDate: new Date(dueDate),
                        id: this.props.assignment.id }
                      }
                    });
                  closeDialogue();
                }}
                color="secondary"
              >Save Changes</Button>
              <Errors error={error} />
            </div>
          )}
        </Mutation>
      );
    }
    return (
      <Mutation mutation={createAssignment} refetchQueries={refetchQueries}>
        {(createAssignment, { loading, error }) => (
          <div>
            <Button
              variant="raised"
              onClick={() => {
                const { student, grade, dueDate, ...assignment } = this.state;
                createAssignment({ variables: { assignment: { ...assignment, dueDate: new Date(dueDate)} } });
                closeDialogue();
              }}
              color="secondary"
            >Create Assignment</Button>
            <Errors error={error} />
          </div>
        )}
      </Mutation>
    );
  }

  render() {
    const { isOpen, closeDialogue, fullScreen, classes, edit } = this.props;
    return (
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={closeDialogue}
          aria-labelledby="add-assignment"
        >
          <DialogTitle id="add-assignment">{edit ? 'Edit Assignment' : 'Add Assignment'}</DialogTitle>
          <DialogContent className={classes.container}>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              multiline
              className={classes.textField}
              value={this.state.description}
              onChange={this.handleChange('description')}
              margin="normal"
            />
            <SelectSubject
              defaultStudent={this.state.student}
              value={this.state.subject}
              handleChange={this.handleChange('subject')}
            />
            <TextField
              id="points-available"
              label="Point Value"
              value={this.state.pointsAvailable}
              onChange={this.handleChange('pointsAvailable')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="datetime-local"
              label="Due Date"
              type="datetime-local"
              value={this.state.dueDate}
              className={classes.textField}
              onChange={this.handleChange('dueDate')}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogue} color="default">
              Cancel
            </Button>
            {this.renderSubmit()}
          </DialogActions>
        </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(AddAssignmentDialogue));
