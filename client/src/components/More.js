import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import GradeAssignmentDialogue from './GradeAssignmentDialogue';
import RescheduleAssignmentDialogue from './RescheduleAssignmentDialogue';
import DeleteAssignmentDialogue from './DeleteAssignmentDialogue';
import AddAssignmentDialogue from './AddAssignmentDialogue';
import { Query } from 'react-apollo';
import query from '../queries/Assignment';

class More extends React.Component {
  state = {
    anchorEl: null,
    dialogue: null,
    grade: false,
    reschedule: false,
    delete: false,
    copy: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOpenDialogue = () => {
    this.setState({ open: true });
  };

  handleCloseDialogue = () => {
    this.setState({ open: false });
  };

  openDialogue(type) {
    this.setState({ [type]: true });
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;
    const { assignment, type } = this.props;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {type !== 'Waiting for Grading' && (
            <MenuItem value="delete" onClick={() => this.openDialogue('delete')}>
              Delete
            </MenuItem>
          )}
          {type !== 'Waiting for Grading' && (
            <MenuItem value="reschedule" onClick={() => this.openDialogue('reschedule')}>
              Reschedule
            </MenuItem>
          )}
          <MenuItem value="grade" onClick={() => this.openDialogue('grade')}>Grade</MenuItem>
          <MenuItem value="copy" onClick={() => this.openDialogue('copy')}>Duplicate</MenuItem>
        </Menu>
        <GradeAssignmentDialogue
          isOpen={this.state.grade}
          closeDialogue={() => this.setState({ grade: false })}
          assignment={assignment.id}
          pointsAvailable={assignment.pointsAvailable}
        />
        <RescheduleAssignmentDialogue
          isOpen={this.state.reschedule}
          closeDialogue={() => this.setState({ reschedule: false })}
          assignment={assignment.id}
          dueDate={assignment.dueDate}
        />
        <DeleteAssignmentDialogue
          isOpen={this.state.delete}
          closeDialogue={() => this.setState({ delete: false })}
          assignment={assignment.id}
        />
        <Query query={query} variables={{ id: assignment.id }}>
          {({ loading, error, data }) => {
            if (loading) { return <p>Loading...</p>; }
            if (error) { return <p>Error</p>; }
            return (
              <AddAssignmentDialogue
                isOpen={this.state.copy}
                closeDialogue={() => this.setState({ copy: false })}
                assignment={data.assignment}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default More;
