const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;
var GraphQLDate = require('graphql-date')
var moment = require('moment');

const User = require('./user_type');

const FeedbackType = new GraphQLObjectType({
  name: 'FeedbackType',
  fields: () => ({
    id: { type: GraphQLID },
    createdDate: { type: GraphQLDate },
    responseDate: { type: GraphQLDate },
    feedback: { type: GraphQLString },
    response: { type: GraphQLString },
    user: { type: User },
  })
});

module.exports = FeedbackType;
