const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const Subject = mongoose.model('subject');
const Assignment = mongoose.model('assignment');

function getSubjects(id) {
  return Subject.find({ student: new ObjectId(id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getSubject(id) {
  return Subject.findOne({ _id: new ObjectId(id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getTotalPointsAvailable(subjectId) {
  return Assignment.aggregate([
    { $match: {
      subject: new ObjectId(subjectId),
      $or: [{ graded: true }, { dueDate: { $lte: new Date() }}]
    } },
    { $group: { _id: '$subject', sum: {$sum: '$pointsAvailable'}}}
  ])
    .then(resp => {
      if (!resp.length) {
        return 0;
      }
      return resp[0].sum;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
}


function getTotalPointsEarned(subjectId) {
  return Assignment.aggregate([
    { $match: {
      subject: new ObjectId(subjectId),
      submitted: true,
    } },
    { $group: { _id: '$subject', sum: {$sum: '$pointsEarned'}}}
  ])
    .then(resp => {
      if (!resp.length) {
        return 0;
      }
      return resp[0].sum;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getStudent(subjectId) {
  return getSubject(subjectId)
    .then(subject => {
      return subject.student;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function createSubject({ name, student }) {
  return Subject.create({ name: name, student: new ObjectId(student) })
    .catch(e => console.log(e));
}

module.exports = {
  getSubjects,
  getTotalPointsEarned,
  getTotalPointsAvailable,
  getSubject,
  getStudent,
  createSubject
};
