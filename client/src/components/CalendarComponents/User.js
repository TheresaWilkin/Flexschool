import React from 'react';

export default function({user, handleClick}) {
  const color = user.hidden ? "lightgrey" : user.color;
  const shadow = user.hidden ? "0px 5px 0px 0px darkgrey" : user.shadow;
  return (
    <div
      className="user" style={{ backgroundColor: color, boxShadow: shadow }}
      onClick={() => handleClick(user.id, !user.hidden)}
    >
      <p>{user.firstName} <i>{user.hidden && '(hidden)'}</i></p>
    </div>
  )
}
