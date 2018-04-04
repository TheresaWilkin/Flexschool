import React from 'react';
import query from '../queries/Calendar';
import moment from 'moment';
import QueryHandler from './QueryHandler';
import Week from './CalendarComponents/Week';
import './CalendarComponents/index.css';

function chunkArray(array, size){
  const tempArray = [];

  for (let i = 0; i < array.length; i += size) {
      tempArray.push(array.slice(i, i+size));
  }

  return tempArray;
}

class Calendar extends React.Component {
  state = { startDate: new Date(moment().startOf('day')) };
  render() {
    return (
      <QueryHandler query={query} variables={{ startDate: this.state.startDate }}>
        {({ data }) => {
          const weeks = chunkArray(data.calendar.dates, 7)
          return (
            <div className="calendar">
              {weeks.map(week => {
                return <Week days={week} key={week[0].date} />
              })}
            </div>
          )
        }}
      </QueryHandler>
    );
  }
}

export default Calendar;
