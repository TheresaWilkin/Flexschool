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

const WeekWeeklyTaskType = require('./week_weekly_task_type');
const WeekResourceType = require('./week_resource_type');

const WeekType = new GraphQLObjectType({
  name: 'WeekType',
  fields: () => ({
    id: { type: GraphQLID },
    start: { type: GraphQLDate },
    end: { type: GraphQLDate },
    term: { type: GraphQLID },
    weeklyTasks: {
      type: GraphQLList(WeekWeeklyTaskType),
      resolve(parentValue) {
        return Terms.getWeeklyTasksForWeek(parentValue._id);
      }
    },
    resources: {
      type: GraphQLList(WeekResourceType),
      resolve(parentValue) {
        return Terms.getResourcesForWeek(parentValue._id)
        .then(res => {
          console.log(res);
          return res;
        })
      }
    }
  })
});

module.exports = WeekType;
