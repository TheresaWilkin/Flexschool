const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const mongoose = require('mongoose');

const Subjects = require('../../services/subjects');
const SubjectType = require('./subject_type');

const StudentType = new GraphQLObjectType({
  name: 'StudentType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    username: {
      type: GraphQLString,
      resolve(parentValue) {
        return parentValue.email
      }
    },
    teacher: { type: GraphQLID },
    subjects: {
      type: new GraphQLList(SubjectType),
      resolve(parentValue, args) {
        return Subjects.getSubjects(parentValue._id);
      }
    },
    color: { type: GraphQLString },
  })
});

module.exports = StudentType;
