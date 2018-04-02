import React from 'react';
import { Query } from 'react-apollo';
import query from '../queries/Assignment';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Errors from './Errors';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import AddAssignmentDialogue from './AddAssignmentDialogue';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import GradeAssignmentDialogue from './GradeAssignmentDialogue';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
   margin: theme.spacing.unit,
 },
 editButton: {
   float: 'right'
 },
 title: {
   margin: theme.spacing.unit,
 },
 text: {
   margin: theme.spacing.unit,
 },
 gradeText: {
   margin: theme.spacing.unit,
   alignSelf: 'center'
 },
 error: {
   marginLeft: theme.spacing.unit,
 }
});

const Row = ({ category, text, classes, noGutter }) => (
  <Typography variant="body1" component="p" className={classes.text} gutterBottom>
      <span style={{ fontWeight: 'bold' }}>{category}: </span>{text}
  </Typography>
)

class Assignment extends React.Component {
  state = {
    edit: false,
    grade: false,
  }

  renderGrade(assignment) {
    const { graded, pointsEarned, pointsAvailable } = assignment;
    const { classes } = this.props;
    if (graded) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'middle' }}>
          <Typography variant="body1" component="p" className={classes.gradeText}>
              <span style={{ fontWeight: 'bold' }}>Grade: </span>{`${pointsEarned}/${pointsAvailable} points`}
          </Typography>
          <Button color="primary" className={classes.button} onClick={() => this.setState({ grade: true })}>
            Change Grade
          </Button>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'middle' }}>
        <Typography variant="body1" component="p" className={classes.gradeText}>
            <span style={{ fontWeight: 'bold' }}>Point Value: </span>{`${pointsAvailable} points`}
        </Typography>
        <Button color="secondary" className={classes.button} onClick={() => this.setState({ grade: true })}>
          Grade
        </Button>
      </div>
    )
  }

  renderRows(assignment) {
    const { classes } = this.props;
    return [
      { category: "Student", text: assignment.subject.student.name },
      { category: "Subject", text: assignment.subject.name },
      { category: "Due", text: moment(assignment.dueDate).calendar() },
      { category: 'Description', text: assignment.description },
    ].map(row => <Row key={row.category} category={row.category} text={row.text} classes={classes} />)
  }

  render() {
    const { classes, match } = this.props;
    return (
      <Query query={query} variables={{ id: match.params.id }}>
        {({ data, error, loading }) => {
          if (error) { return <Errors error={error} />; }
          if (loading) { return <p>Loading...</p>; }
          const { name } = data.assignment;
          return (
            <Paper className={classes.container}>
              <Tooltip id="tooltip-icon" title="Edit Assignment">
                <Button
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="edit"
                  className={classes.editButton}
                  onClick={() => this.setState({ edit: true })}
                >
                  <Icon className="material-ui">edit</Icon>
                </Button>
              </Tooltip>
              <Typography variant="headline" component="h3" className={classes.title} gutterBottom>
                  {name}
              </Typography>
              {this.renderRows(data.assignment)}
              {this.renderGrade(data.assignment)}
              <AddAssignmentDialogue
                isOpen={this.state.edit}
                closeDialogue={() => this.setState({ edit: false })}
                assignment={data.assignment}
                edit
              />
              <GradeAssignmentDialogue
                isOpen={this.state.grade}
                closeDialogue={() => this.setState({ grade: false })}
                assignment={data.assignment.id}
                pointsAvailable={data.assignment.pointsAvailable}
              />
            </Paper>
          )
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(Assignment));
