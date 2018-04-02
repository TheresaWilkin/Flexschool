const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const User = mongoose.model('user');

function getStudents(id) {
  return User.find({ teacher: new ObjectId(id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getStudent(id) {
  return User.findOne({ _id: new ObjectId(id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function signupStudent({ email, password, name }, req) {
  const user = new User({ email, password, name, teacher: new ObjectId(req.user.id) });
  if (!email || !password) { throw new Error('You must provide a username and password.'); }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) { throw new Error('Username in use'); }
      return user.save();
    })
}


module.exports = { getStudents, getStudent, signupStudent };
