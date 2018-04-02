import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import { Link } from 'react-router-dom';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Students extends React.Component {
  render() {
    const { classes, open, students } = this.props;
    if (!students || !students.length) {
      return null;
    }
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {students.map(({ name, id }) => (
            <ListItem key={id} button component={Link} to={`/students/${id}`} className={classes.nested}>
              <ListItemText inset primary={name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  }
}

export default withStyles(styles)(Students);
