import React, { Component } from 'react';
import moment from 'moment';
import faker from 'faker';
import Week from './Week';
import User from './User';
import './index.css';

const users = {
  "1": {
    firstName: faker.fake("{{name.firstName}}"),
    id: 1,
    color: "lightpink",
    shadow: "0px 5px 0px 0px #cc7c89",
    hidden: false,
  },
  "2": {
    firstName: faker.fake("{{name.firstName}}"),
    id: 2,
    color: "lightblue",
    shadow: "0px 5px 0px 0px #6daec4",
    lightColor: "#fcd1d9",
    hidden: false,
  },
  "3": {
    firstName: faker.fake("{{name.firstName}}"),
    id: 3,
    color: "lightgreen",
    shadow: "0px 5px 0px 0px #15B358",
    hidden: false,
  }
}

const date = function (from, to) {
      var fromMilli = Date.parse(from);
      var dateOffset = faker.random.number(Date.parse(to) - fromMilli);

      var newDate = new Date(fromMilli + dateOffset);

      return newDate;
  };

function generateEvent() {
  const event = {
    userId: Math.ceil(Math.random() * 3),
    eventName: faker.fake("{{random.word}}"),
    id: faker.fake("{{random.uuid}}")
  }
  event.date = date(moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().add(5, 'weeks').format('YYYY-MM-DD'));
  event.duration = Math.random() * 28800000;
  return event;
}

function generateEvents() {
  const events = [];
  for (let i = 0; i < 100; i++) {
    events.push(generateEvent());
  }
  return events;
}

function sortEventsByDate(events) {
  return events.reduce(function(acc, curr) {
    const date = moment(curr.date).format('MM-D');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {})
}

class Calendar extends Component {
  constructor(props){
  	super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(userId, hidden) {
    this.props.dispatch({ type: 'HIDE_TOGGLE', payload: { userId, hidden } });
  }

  componentDidMount() {
    const today = moment(new Date());
    const startDate = moment(today).day() === 1 ? moment(today) : moment(today).day(-6)
    const weeks = [];
    for (let i = 0; i < 5; i++) {
      weeks.push(moment(startDate).add(i, 'weeks'))
    }
    const dates = weeks.map(week => {
      let days = [];
      for (let i = 0; i < 7; i++) {
        const day = moment(week).add(i, 'days')
        days.push(day)
      }
      return days;
    })
    this.props.dispatch({
      type: 'SETUP',
      payload: {
        users,
        eventsByDate: sortEventsByDate(generateEvents()),
        today,
        startDate,
        dates
      }
    })
  }

  usersList(users) {
    return Object.keys(this.props.users).map(userId => users[userId]);
  }

  render() {
    return (
      <div className="calendar">
        <h1>My Calendar</h1>
        <div className="users">
          {this.usersList(this.props.users).map(user => <User user={user} key={user.id} handleClick={this.handleClick} />)}
        </div>
        {this.props.dates.map(week => {
          const key = moment(week[0]).format('MM-DD');
          return <Week days={week} key={key} />
        })}
      </div>
    );
  }
}

function mapStateToProps({state}) {
  return { dates: state.dates, users: state.users }
}

export default Calendar;
