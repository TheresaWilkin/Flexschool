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

const ResourceType = new GraphQLObjectType({
  name: 'ResourceType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    terms: { type: GraphQLList(GraphQLID) },
    parts: { type: GraphQLInt },
    partsType: { type: GraphQLString },
    partDuration: { type: GraphQLInt },
    course: { type: GraphQLID },
  })
});

module.exports = ResourceType;
