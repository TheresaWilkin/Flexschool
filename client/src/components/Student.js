import React, { Component } from 'react';
import { Query } from "react-apollo";
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import query from '../queries/Student';
import Grid from 'material-ui/Grid';
import Errors from './Errors';
import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CreateSubject from './CreateSubject';

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
      <Query query={query} variables={this.props.match.params}>
        {({ error, loading, data }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <Errors error={error} />; }
          const { student } = data;
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
                    {student.subjects.map(subject =>
                      <ListItem key={subject.id}>
                        <ListItemText
                          primary={subject.name}
                        />
                      </ListItem>
                    )}
                  </List>
                  <CreateSubject />
                </Paper>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withRouter(Student));
