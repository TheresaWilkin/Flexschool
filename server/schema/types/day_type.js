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

const AssignmentType = require('./assignment_type');
const Assignments = require('../../services/assignments');

const DayType = new GraphQLObjectType({
  name: 'DayType',
  fields: () => ({
    id: {
      type: GraphQLDate,
      resolve(parentValue) {
        return parentValue.date
      }
    },
    date: { type: GraphQLDate },
    assignments: {
      type: new GraphQLList(AssignmentType),
      resolve(parentValue, args, req) {
        return Assignments.getAssignmentsByDate(parentValue.date, req.user);
      }
    }
  })
});

module.exports = DayType;
