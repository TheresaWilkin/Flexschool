import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import query from '../queries/Gradebook';
import GradebookListItem from './GradebookListItem';
import QueryHandler from './QueryHandler';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  })
});

class Gradebook extends Component {
  renderList({ name, subjects, id }) {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={4} key={id}>
        <Paper className={classes.root} elevation={4}>
          <List subheader={<ListSubheader component="div">{name}</ListSubheader>}>
            {subjects && subjects.length ? subjects.map(item => <GradebookListItem {...item} key={item.id} />) : (
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
      <QueryHandler query={query}>
        {({ data }) => {
          return (
            <Grid container justify="space-between">
              {data.user.students && data.user.students.map(student => this.renderList(student))}
            </Grid>
          );
        }
      }
    </QueryHandler>
    )
  }
}

Gradebook.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gradebook);
