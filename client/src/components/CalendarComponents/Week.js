import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day';

export default class Week extends Component {
  render() {
    return (
      <div className="week">
        {this.props.days.map(day => <Day day={day} key={day.id} />)}
      </div>
    )
  }
}
