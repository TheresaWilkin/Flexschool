import React, { Component } from 'react';
import moment from 'moment';
import Event from './Event';
import { withStyles } from 'material-ui/styles';
import './index.css';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  paper: {
      padding: theme.spacing.unit,
      height: '100%',
      textAlign: 'center'
    },
});

export function Unavailable({children}) {
  return <p className="unavailable">{children}</p>
}

class Day extends Component {
  renderEvents(events) {
      const { hiddenStudents, day } = this.props;
      return day.assignments.map(event => <Event key={event.id} event={event} hiddenStudents={hiddenStudents} />)
  }

  render(){
    const { day, classes } = this.props;
    const { date } = day;
    return(
      <Grid item xs>
        <Paper className={classes.paper}>
          <strong>{moment(date).format('ddd, MMM DD')}</strong>
          {this.renderEvents()}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Day);
