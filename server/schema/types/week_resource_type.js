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
const ResourceType = require('./resource_type');

const WeekResourceType = new GraphQLObjectType({
  name: 'WeekResourceType',
  fields: () => ({
    id: { type: GraphQLID },
    resource: {
      type: ResourceType,
      resolve(parentValue) {
        return Terms.getResource(parentValue.resource);
      }
    },
    date: { type: GraphQLDate },
    week: { type: GraphQLID },
  })
});

module.exports = WeekResourceType;
