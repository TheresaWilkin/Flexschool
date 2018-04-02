import React from 'react';
import { Mutation } from 'react-apollo';
import rescheduleAssignment from '../mutations/RescheduleAssignment';
import Dashboard from '../queries/Dashboard';
import Gradebook from '../queries/Gradebook';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import DateAndTimePicker from './DateAndTimePicker';
import moment from 'moment';
import Errors from './Errors';

class RescheduleAssignmentDialogue extends React.Component {
  state = {
    dueDate: moment().format("YYYY-MM-DDThh:mm")
  }

  changeDate(e) {
    this.setState({ dueDate: e.target.value });
  }

  render() {
    const { isOpen, closeDialogue, assignment, fullScreen } = this.props;
    const { dueDate } = this.state;
    return (
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={closeDialogue}
          aria-labelledby="reschedule-assignment"
        >
          <DialogTitle id="reschedule-assignment">Reschedule Assignment</DialogTitle>
          <DialogContent style={{ height: '100px' }}>
            <DateAndTimePicker
              label="Due Date"
              value={dueDate}
              onChange={this.changeDate.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogue} color="default">
              Cancel
            </Button>
            <Mutation mutation={rescheduleAssignment} refetchQueries={[{ query: Gradebook }, { query: Dashboard }]}>
              {(rescheduleAssignment, { loading, error }) => (
                <div>
                  <Button
                    variant="raised"
                    onClick={() => {
                      rescheduleAssignment({ variables: { dueDate: new Date(dueDate), assignment } });
                      closeDialogue();
                    }}
                    color="secondary"
                  >Reschedule</Button>
                  <Errors error={error} />
                </div>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withMobileDialog()(RescheduleAssignmentDialogue);
