import React from 'react';
import moment from 'moment';
import { getStudentColor } from '../common';
import { Link } from 'react-router-dom';

export default function({ event, hiddenStudents }) {
  const { student } = event;
  if (hiddenStudents.includes(student.id)) {
    return null
  }
  const textDecoration = event.graded ? 'line-through' : 'none';
  const backgroundColor = getStudentColor(student.color).color;
  return (
    <Link to="/" style={{ textDecoration, color: 'black' }}>
      <div
        style={{ backgroundColor }}
        className="event"
      >
        <p>{event.name}</p>
        <em>{moment(event.dueDate).format('h:mm a')}</em>
      </div>
    </Link>
  );
}
