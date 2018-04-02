const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const Assignment = mongoose.model('assignment');
const User = mongoose.model('user');
const Subject = mongoose.model('subject');

function getAssignments(subjectId) {
  return Assignment.find({ subject: new ObjectId(subjectId) })
    .sort({date: 'desc'})
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getAssignment(id) {
  return Assignment.findOne({ _id: new ObjectId(id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function getAllSubjectIds(userId) {
  return User.find({ teacher: new ObjectId(userId) })
    .then(students => {
      const studentIds = students.map(student => new ObjectId(student._id));
      return Subject.find({ student: { $in: studentIds }})
    })
    .then(subjects => {
      return subjects.map(subject => new ObjectId(subject._id));
    })
}

function getSchoolOverdueAssignments(userId) {
  return getAllSubjectIds(userId)
    .then(subjectIds => {
      return Assignment.find({
        subject: { $in: subjectIds },
        dueDate: { $lt: new Date() },
        submitted: false
      })
    })
    .catch(err => console.log('err', err));
}

function getSchoolNeedGradingAssignments(userId) {
  return getAllSubjectIds(userId)
    .then(subjectIds => {
      return Assignment.find({
        subject: { $in: subjectIds },
        graded: false,
        submitted: true
      })
    })
    .catch(err => console.log('err', err));
}

function getSchoolUpcomingAssignments(userId, limit = 10) {
  return getAllSubjectIds(userId)
    .then(subjectIds => {
      return Assignment.find({
        subject: { $in: subjectIds },
        submitted: false,
        dueDate: { $gte: new Date() },
      }).sort('dueDate').limit(limit);
    })
    .catch(err => console.log('err', err));
}

function findAssignmentStudent(assignment) {
  return Assignment.findOne({ _id: new ObjectId(assignment) })
    .then(assign => {
      if (!assign) {
        throw new Error('Assignment not found');
      }
      return Subject.findOne({ _id: new ObjectId(assign.subject) })
    })
    .then(subject => {
      return User.findOne({ _id: new ObjectId(subject.student) })
    })
    .catch(e => console.log(e));
}

function findSubjectStudent(subject) {
  return Subject.findOne({ _id: new ObjectId(subject) })
    .then(subject => {
      return User.findOne({ _id: new ObjectId(subject.student) })
    })
    .catch(e => console.log(e));
}

function gradeAssignment({ pointsEarned, assignment }, user) {
  return findAssignmentStudent(assignment)
    .then(student => {
      if (student.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      return Assignment.update({ _id: new ObjectId(assignment) }, { $set: { pointsEarned: pointsEarned, submitted: true, graded: true } })
    })
    .then(() => {
      return Assignment.findOne({ _id: new ObjectId(assignment) });
    })
    .catch(err => console.log(err));
}

function rescheduleAssignment({ dueDate, assignment }, user) {
  return findAssignmentStudent(assignment)
    .then(student => {
      if (student.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      return Assignment.update({ _id: new ObjectId(assignment) }, { $set: { dueDate: dueDate } })
    })
    .then(() => {
      return Assignment.findOne({ _id: new ObjectId(assignment) });
    })
    .catch(err => console.log(err));
}

function deleteAssignment({ assignment }, user) {
  return findAssignmentStudent(assignment)
    .then(student => {
      if (student.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      return Assignment.remove({ _id: new ObjectId(assignment) })
    })
    .then(() => {
      return Assignment.findOne({ _id: new ObjectId(assignment) });
    })
    .catch(err => console.log(err));
}

function createAssignment(assignment, user) {
  return findSubjectStudent(assignment.subject)
    .then(student => {
      if (student.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      const newAssignment = Object.assign({}, assignment,
        { subject: new ObjectId(assignment.subject) });
      return Assignment.create(newAssignment)
    })
    .catch(err => console.log(err));
}

function updateAssignment(assignment, user) {
  return findSubjectStudent(assignment.subject)
    .then(student => {
      if (student.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      const newAssignment = Object.assign({}, assignment,
        { subject: new ObjectId(assignment.subject), _id: new ObjectId(assignment.id) });
        console.log('new', newAssignment)
      return Assignment.update({ _id: new ObjectId(assignment.id) }, { $set: newAssignment });
    })
    .then(() => {
      return Assignment.findOne({ _id: new ObjectId(assignment.id) });
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => console.log(err));
}

module.exports = {
  getAssignments,
  getSchoolOverdueAssignments,
  getSchoolNeedGradingAssignments,
  getSchoolUpcomingAssignments,
  gradeAssignment,
  rescheduleAssignment,
  createAssignment,
  getAssignment,
  updateAssignment
};
