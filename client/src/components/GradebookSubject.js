import React, { Component } from 'react';
import { Query } from 'react-apollo';
import query from '../queries/GradebookSubject';
import Errors from './Errors';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AddAssignmentDialogue from './AddAssignmentDialogue';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  list: {
    overflowY: 'auto'
  },
  button: {
   margin: theme.spacing.unit,
   float: 'right',
 },
});

const percentage = (earned, available) => {
  if (!available) {
    return "";
  }
  return `${Math.floor(earned/available*100)}`;
}

class GradebookSubject extends Component {
  state = {
    open: false,
  }
  renderListItem({ id, name, pointsAvailable, pointsEarned, graded }) {
    return (
      <ListItem button component={Link} to={`/assignments/${id}`} key={id}>
        <Avatar alt={percentage(pointsEarned, pointsAvailable)} className={this.props.classes.avatar}>
          {graded ? percentage(pointsEarned, pointsAvailable) : ""}
        </Avatar>
        <ListItemText
          primary={name}
          secondary={graded ? `${pointsEarned} out of ${pointsAvailable}` : `${pointsAvailable} points available`}
        />
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Query query={query} variables={this.props.match.params}>
        {({ data, error, loading }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <Errors error={error} />; }
          const { subject } = data;
          const { name, pointsEarned, pointsAvailable, assignments, student } = subject;
          return (
            <div>
              {this.pointsAvailable ? <p>{percentage(pointsEarned, pointsAvailable)}%</p> : <p/>}
              <Grid container justify="space-between">
                <Grid item xs={12} sm={4}>
                  <Paper className={classes.root} elevation={4}>
                    <List subheader={<ListSubheader component="div">{name} ({pointsEarned}/{pointsAvailable} points)</ListSubheader>}>
                      {assignments.length ? assignments.map(item => this.renderListItem(item)) : (
                        <ListItem>
                          <ListItemText secondary="None found" />
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </Grid>
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
              </Grid>
              <AddAssignmentDialogue
                isOpen={this.state.open}
                closeDialogue={() => this.setState({ open: false })}
                subject={this.props.match.params.id}
                student={student.id}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(GradebookSubject);
