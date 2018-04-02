const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;
var GraphQLDate = require('graphql-date')

const SubjectType = require('./subject_type');
const Subjects = require('../../services/subjects');

const AssignmentType = new GraphQLObjectType({
  name: 'AssignmentType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pointsEarned: { type: GraphQLInt },
    pointsAvailable: { type: GraphQLInt },
    subject: {
      type: SubjectType,
      resolve(parentValue, args, req) {
        return Subjects.getSubject(parentValue.subject)
      }
    },
    description: { type: GraphQLString },
    submitted: { type: GraphQLBoolean },
    dueDate: { type: GraphQLDate },
    graded: { type: GraphQLBoolean },
    student: {
      type: GraphQLID,
      resolve(parentValue, args, req) {
        return Subjects.getStudent(parentValue.subject);
      }
    }
  })
});

module.exports = AssignmentType;
