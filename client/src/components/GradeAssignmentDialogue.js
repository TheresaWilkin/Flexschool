import React from 'react';
import { Mutation } from 'react-apollo';
import gradeAssignment from '../mutations/GradeAssignment';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Errors from './Errors';
import assignmentRefetchQueries from '../queries/assignmentRefetchQueries';

const labels = {
    0: 'F',
    60: 'D',
    70: 'C',
    80: 'B',
    90: 'A'
}

class GradeAssignmentDialogue extends React.Component {
  state = {
    percentage: 0
  }

  changePoints(value) {
    this.setState({ percentage: value });
  }

  render() {
    const { isOpen, closeDialogue, assignment, pointsAvailable, fullScreen, subject } = this.props;
    const { percentage } = this.state;
    const pointsEarned = Math.floor(pointsAvailable * percentage / 100);
    const title = <span style={{ display: 'inline-block', width: '250px'}}>Grade Assignment: {percentage}%</span>;
    const refetchQueries = assignmentRefetchQueries(subject);
    return (
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={closeDialogue}
          aria-labelledby="grade-assignment"
        >
          <DialogTitle id="grade-assignment">{title}</DialogTitle>
          <DialogContent style={{ height: '100px' }}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={percentage}
              onChange={this.changePoints.bind(this)}
              labels={labels}
              tooltip={false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogue} color="default">
              Cancel
            </Button>
            <Mutation mutation={gradeAssignment} refetchQueries={refetchQueries}>
              {(gradeAssignment, { loading, error }) => (
                <div>
                  <Button
                    variant="raised"
                    onClick={() => {
                      gradeAssignment({ variables: { pointsEarned, assignment } });
                      closeDialogue();
                    }}
                    color="secondary"
                  >Assign Grade</Button>
                  <Errors error={error} />
                </div>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withMobileDialog()(GradeAssignmentDialogue);
