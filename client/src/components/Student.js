import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import query from '../queries/Student';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CreateSubject from './CreateSubject';
import GradebookListItem from './GradebookListItem';
import QueryHandler from './QueryHandler';

const styles = theme => ({
  subjects: {
    padding: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
});


class Student extends Component {
  render() {
    const { classes } = this.props;
    return (
      <QueryHandler query={query} variables={this.props.match.params}>
        {({ data }) => {
          const { student } = data;
          const { subjects } = student;
          return (
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <Typography variant="headline">{student.name}</Typography>
                <Typography variant="caption"><em>{student.username}</em></Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.subjects}>
                  <List
                    subheader={<ListSubheader component="div" className={classes.subheader}>Subjects</ListSubheader>}
                  >
                    {subjects && subjects.length ? subjects.map(item => <GradebookListItem {...item} key={item.id} />) : (
                      <ListItem>
                        <ListItemText secondary="None found" />
                      </ListItem>
                    )}
                  </List>
                  <CreateSubject />
                </Paper>
              </Grid>
            </Grid>
          );
        }}
      </QueryHandler>
    );
  }
}

export default withStyles(styles)(withRouter(Student));
