const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const Terms = require('../../services/terms');

const CourseType = new GraphQLObjectType({
  name: 'CourseType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    teacher: { type: GraphQLID },
    terms: {
      type: GraphQLList(require('./term_type')),
      resolve(parentValue, args) {
        return Terms.getTerms(parentValue._id);
      }
    },
    resources: {
      type: GraphQLList(require('./resource_type')),
      resolve(parentValue) {
        return Terms.getResources(parentValue._id);
      }
    },
    weeklyTasks: {
      type: GraphQLList(require('./weekly_task_type')),
      resolve(parentValue) {
        return Terms.getWeeklyTasks(parentValue._id);
      }
    }
  })
});

module.exports = CourseType;
