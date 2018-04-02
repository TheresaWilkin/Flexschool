import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { Link } from 'react-router-dom';
import More from './More';
import moment from 'moment';
import AddAssignmentButton from './AddAssignmentButton';
import SelectStudent from './SelectStudent';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  list: {
    overflowY: 'auto'
  },
  button: {
   margin: theme.spacing.unit,
 },
});

class Dashboard extends Component {
  state = {
    student: ''
  }
  renderListItem(assignment, type) {
    const { id, name, dueDate } = assignment;
    const secondary = type !== 'Waiting for Grading' ? moment(dueDate).fromNow() : '';
    return (
      <ListItem button component={Link} to={`/assignments/${id}`} key={id}>
        <ListItemText primary={name} secondary={secondary} />
        <ListItemSecondaryAction>
          <More assignment={assignment} type={type} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  renderList(title, items) {
    const { classes } = this.props;
    const itemsList = this.state.student ? items.filter(item => item.student === this.state.student) : items;
    return (
      <Grid item xs={12} sm={4}>
        <Paper className={classes.root} elevation={4}>
          {title === 'Upcoming' && <AddAssignmentButton />}
          <List subheader={<ListSubheader component="div">{title}</ListSubheader>} className={classes.list}>
            {itemsList.length ? itemsList.map(item => this.renderListItem(item, title)) : (
              <ListItem>
                <ListItemText secondary="None found" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { data, classes } = this.props;
    return (
      <Grid container justify="space-between">
        <Grid item xs={12}>
          <SelectStudent
            value={this.state.student}
            students={data.user.students}
            handleChange={({ target }) => this.setState({ student: target.value })}
            nullable
          />
          <Button variant="raised" color="secondary" component={Link} to="/students/new" className={classes.button}>
            Add Student
          </Button>
        </Grid>
        {this.renderList('Overdue', data.user.allOverdue)}
        {this.renderList('Waiting for Grading', data.user.allNeedGrading)}
        {this.renderList('Upcoming', data.user.allUpcoming)}
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
