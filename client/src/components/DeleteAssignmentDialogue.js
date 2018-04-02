import React from 'react';
import { Mutation } from 'react-apollo';
import deleteAssignment from '../mutations/DeleteAssignment';
import Dashboard from '../queries/Dashboard';
import Gradebook from '../queries/Gradebook';
import Dialog, {
  DialogActions,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class DeleteAssignmentDialogue extends React.Component {
  render() {
    const { isOpen, closeDialogue, assignment, fullScreen } = this.props;
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
            <Mutation mutation={deleteAssignment} refetchQueries={[{ query: Gradebook }, { query: Dashboard }]}>
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
