import React, { Component } from 'react';
import moment from 'moment';
import Event from './Event';
import './index.css';

export function Unavailable({children}) {
  return <p className="unavailable">{children}</p>
}

class Day extends Component {
  renderEvents(events) {
      return events.map(event => <Event key={event.id} event={event} user={{
        firstName: 'Alice',
        id: 1,
        color: "lightpink",
        shadow: "0px 5px 0px 0px #cc7c89",
        hidden: false,
      }}/>)
  }

  render(){
    const { date, assignments } = this.props.day;
    return(
      <div className="day">
        <strong>{moment(date).format('ddd, MMM DD')}</strong>
        {this.renderEvents(assignments)}
      </div>
    );
  }
}

function mapStateToProps({state}) {
  const { today, eventsByDate, users } = state;
  return { today, eventsByDate, users }
}

export default Day;
