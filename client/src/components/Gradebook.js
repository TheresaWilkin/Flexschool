import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import query from '../queries/Gradebook';
import Errors from './Errors';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }
});

const percentage = (earned, available) => {
  if (!available) {
    return "";
  }
  return `${Math.floor(earned/available*100)}`;
}

class Gradebook extends Component {
  renderListItem({ id, name, pointsAvailable, pointsEarned }) {
    return (
      <ListItem button component={Link} to={`/gradebook/subjects/${id}`} key={id}>
        <Avatar alt={percentage(pointsEarned, pointsAvailable)} className={this.props.classes.avatar}>
          {percentage(pointsEarned, pointsAvailable)}
        </Avatar>
        <ListItemText primary={name} />
      </ListItem>
    );
  }

  renderList({ name, subjects, id }) {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={4} key={id}>
        <Paper className={classes.root} elevation={4}>
          <List subheader={<ListSubheader component="div">{name}</ListSubheader>}>
            {subjects && subjects.length ? subjects.map(item => this.renderListItem(item)) : (
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
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <Errors error={error} />; }
          return (
            <Grid container justify="space-between">
              {data.user.students && data.user.students.map(student => this.renderList(student))}
            </Grid>
          );
        }
      }
      </Query>
    )
  }
}

Gradebook.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gradebook);
