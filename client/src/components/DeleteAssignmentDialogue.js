import React from 'react';
import { Mutation } from 'react-apollo';
import deleteAssignment from '../mutations/DeleteAssignment';
import Dialog, {
  DialogActions,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import assignmentRefetchQueries from '../queries/assignmentRefetchQueries';

class DeleteAssignmentDialogue extends React.Component {
  render() {
    const { isOpen, closeDialogue, assignment, fullScreen, subject } = this.props;
    const refetchQueries = assignmentRefetchQueries(subject);
    return (
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={closeDialogue}
          aria-labelledby="delete-assignment"
        >
          <DialogTitle id="delete-assignment">Delete Assignment</DialogTitle>
          <DialogActions>
            <Button onClick={closeDialogue} color="default">
              Cancel
            </Button>
            <Mutation mutation={deleteAssignment} refetchQueries={refetchQueries}>
              {(deleteAssignment, { loading, error }) => (
                <Button
                  variant="raised"
                  onClick={() => {
                    deleteAssignment({ variables: { assignment } });
                    closeDialogue();
                  }}
                  color="secondary"
                >Delete Assignment</Button>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withMobileDialog()(DeleteAssignmentDialogue);
