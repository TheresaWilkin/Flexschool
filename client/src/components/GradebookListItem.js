import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

const styles = theme => ({
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

class GradebookListItem extends Component {
  render() {
    const { id, name, pointsAvailable, pointsEarned, classes } = this.props;
    return (
      <ListItem button component={Link} to={`/gradebook/subjects/${id}`} key={id}>
        <Avatar alt={percentage(pointsEarned, pointsAvailable)} className={classes.avatar}>
          {percentage(pointsEarned, pointsAvailable)}
        </Avatar>
        <ListItemText primary={name} />
      </ListItem>
    );
  }
}

GradebookListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradebookListItem);
