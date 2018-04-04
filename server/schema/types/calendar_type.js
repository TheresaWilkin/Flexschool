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

const DayType = require('./day_type');
const Assignments = require('../../services/assignments');
const Dates = require('../../services/dates');


const CalendarType = new GraphQLObjectType({
  name: 'CalendarType',
  fields: () => ({
    id: {
      type: GraphQLDate,
      resolve(parentValue) {
        return parentValue.startDate
      }
    },
    startDate: {
      type: GraphQLDate,
      resolve(parentValue) {
        console.log(parentValue);
        return parentValue.startDate;
      }
    },
    dates: {
      type: new GraphQLList(DayType),
      resolve(parentValue, args, req) {
        return Dates.getDates(parentValue.startDate)
      }
    }
  })
});

module.exports = CalendarType;
