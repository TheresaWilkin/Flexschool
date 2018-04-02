const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const Students = require('../../services/students');
const Subjects = require('../../services/subjects');
const Assignments = require('../../services/assignments');

const SubjectType = new GraphQLObjectType({
  name: 'SubjectType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pointsEarned: {
      type: GraphQLInt,
      resolve(parentValue, args) {
        return Subjects.getTotalPointsEarned(parentValue._id)
      }
    },
    pointsAvailable: {
      type: GraphQLInt,
      resolve(parentValue, args) {
        return Subjects.getTotalPointsAvailable(parentValue._id);
      }
    },
    student: {
      type: require('./user_type'),
      resolve(parentValue, args) {
        return Students.getStudent(parentValue.student)
      }
    },
    assignments: {
      type: GraphQLList(require('./assignment_type')),
      resolve(parentValue, args) {
        return Assignments.getAssignments(parentValue._id);
      }
    }
  })
});

module.exports = SubjectType;
