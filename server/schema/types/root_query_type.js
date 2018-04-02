const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const UserType = require('./user_type');
const AssignmentType = require('./assignment_type');
const StudentType = require('./student_type');
const SubjectType = require('./subject_type');

const Assignments = require('../../services/assignments');
const Students = require('../../services/students');
const Subjects = require('../../services/subjects');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    assignment: {
      type: AssignmentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Assignments.getAssignment(id, req.user)
      }
    },
    student: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Students.getStudent(id);
      }
    },
    subject: {
      type: SubjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Subjects.getSubject(id);
      }
    }
  })
});

module.exports = RootQueryType;
