import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

export default class Week extends Component {
  render() {
    return (
      <Paper>
        <Grid container spacing={0}>
          {this.props.days.map(day => {
            let weekday = moment(day.date).day();
            if (this.props.displayedWeekdays.includes(weekday)) {
              return <Day day={day} key={day.id} hiddenStudents={this.props.hiddenStudents} />;
            }
            return null;
          })}
        </Grid>
      </Paper>
    )
  }
}
