import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import query from '../queries/Feedback';
import FeedbackListItem from './FeedbackListItem';
import QueryHandler from './QueryHandler';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  title: {
    backgroundColor: theme.palette.background.default
  }
});

class Feedback extends Component {
  render() {
    const { classes } = this.props;
    return (
      <QueryHandler query={query}>
        {({ data }) => {
          return (
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Paper className={classes.root} elevation={4}>
                  <List subheader={<ListSubheader component="div" className={classes.title}>Submitted Feedback</ListSubheader>}>
                    {data.feedback && data.feedback.length ? data.feedback.map(item => <FeedbackListItem {...item} key={item.id} />) : (
                      <ListItem>
                        <ListItemText secondary="None found" />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          );
        }
      }
    </QueryHandler>
    )
  }
}

Feedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feedback);
