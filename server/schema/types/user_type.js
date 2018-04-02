const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const mongoose = require('mongoose');

const Students = require('../../services/students');
const Subjects = require('../../services/subjects');
const Assignments = require('../../services/assignments');

const SubjectType = require('./subject_type');
const AssignmentType = require('./assignment_type');
const StudentType = require('./student_type');
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    students: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return Students.getStudents(parentValue._id);
      }
    },
    name: { type: GraphQLString },
    subjects: {
      type: new GraphQLList(SubjectType),
      resolve(parentValue, args) {
        return Subjects.getSubjects(parentValue._id);
      }
    },
    allOverdue: {
      type: new GraphQLList(AssignmentType),
      resolve(parentValue, args) {
        return Assignments.getSchoolOverdueAssignments(parentValue._id)
      }
    },
    allNeedGrading: {
      type: new GraphQLList(AssignmentType),
      resolve(parentValue, args) {
        return Assignments.getSchoolNeedGradingAssignments(parentValue._id)
      }
    },
    allUpcoming: {
      type: new GraphQLList(AssignmentType),
      resolve(parentValue, args) {
        return Assignments.getSchoolUpcomingAssignments(parentValue._id)
      }
    }
  })
});

module.exports = UserType;
