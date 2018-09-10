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
const WeeklyTaskType = require('./weekly_task_type');

const WeekWeeklyTaskType = new GraphQLObjectType({
  name: 'WeekWeeklyTaskType',
  fields: () => ({
    id: { type: GraphQLID },
    task: {
      type: WeeklyTaskType,
      resolve(parentValue) {
        return Terms.getWeeklyTask(parentValue.task);
      }
    },
    date: { type: GraphQLDate },
    week: { type: GraphQLID },
  })
});

module.exports = WeekWeeklyTaskType;
