<div className="users">
  {students.map(user => <User user={user} key={user.id} handleClick={this.handleClick} />)}
</div>
