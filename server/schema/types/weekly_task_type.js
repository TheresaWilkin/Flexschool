const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;
var GraphQLDate = require('graphql-date');

const Terms = require('../../services/terms');

const WeeklyTaskType = new GraphQLObjectType({
  name: 'WeeklyTaskType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    terms: { type: GraphQLList(GraphQLID) },
    partDuration: { type: GraphQLInt },
    course: { type: GraphQLID },
    days: { type: GraphQLList(GraphQLString) },
  })
});

module.exports = WeeklyTaskType;
