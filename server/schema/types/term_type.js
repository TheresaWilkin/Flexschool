const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;
var GraphQLDate = require('graphql-date');

const WeekType = require('./week_type');

const Terms = require('../../services/terms');

const TermType = new GraphQLObjectType({
  name: 'TermType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    course: {
      type: require('./term_type'),
      resolve(parentValue, args) {
        return Terms.getCourse(parentValue.course);
      }
    },
    order: { type: GraphQLInt },
    start: { type: GraphQLDate },
    end: { type: GraphQLDate },
    vacations: { type: GraphQLList(GraphQLDate) },
    schooldays: { type: GraphQLList(GraphQLString) },
    weeks: {
      type: GraphQLList(WeekType),
      resolve(parentValue) {
        return Terms.getWeeks(parentValue);
      }
    }
  })
});

module.exports = TermType;
