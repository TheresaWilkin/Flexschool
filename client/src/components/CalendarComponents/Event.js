import React from 'react';
import moment from 'moment';

export default function({event, user}) {
  if (user.hidden) {
    return null;
  }
  return (
    <div
      style={{ backgroundColor: user.color }}
      className="event"
    >
      <p>{event.name}</p>
      <em>{moment(event.dueDate).format('h:mm a')}</em>
    </div>
  );
}
