import React from 'react';
import query from '../queries/Calendar';
import moment from 'moment';
import QueryHandler from './QueryHandler';
import Week from './CalendarComponents/Week';
import './CalendarComponents/index.css';
import WeekdaySelect from './CalendarComponents/WeekdaySelect';
import StudentsSelect from './CalendarComponents/StudentsSelect';
import Icon from 'material-ui/Icon';
import Grid from 'material-ui/Grid';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';

function chunkArray(array, size){
  const tempArray = [];

  for (let i = 0; i < array.length; i += size) {
      tempArray.push(array.slice(i, i+size));
  }

  return tempArray;
}

class Calendar extends React.Component {
  state = {
    startDate: new Date(moment().startOf('day')),
    hiddenStudents: [],
    weekdays: [0,1,2,3,4,5,6]
  };

  onChange(e) {
    this.setState({ weekdays: e.target.value });
  }

  onHideStudents(e) {
    this.setState({ hiddenStudents: e.target.value });
  }

  render() {
    return (
      <QueryHandler query={query} variables={{ startDate: this.state.startDate }}>
        {({ data }) => {
          const weeks = chunkArray(data.calendar.dates, 7)
          return (
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography>Filters</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                      <StudentsSelect
                        hiddenStudents={this.state.hiddenStudents}
                        onChange={this.onHideStudents.bind(this)}
                      />
                      <WeekdaySelect weekdays={this.state.weekdays} onChange={this.onChange.bind(this)} />
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item xs={12}>
                {weeks.map(week => {
                  return (
                    <Week
                      days={week}
                      key={week[0].date}
                      displayedWeekdays={this.state.weekdays}
                      hiddenStudents={this.state.hiddenStudents}
                    />
                  )
                })}
              </Grid>
            </Grid>
          )
        }}
      </QueryHandler>
    );
  }
}

export default Calendar;
