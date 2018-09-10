const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
var GraphQLDate = require('graphql-date')

const UserType = require('./user_type');
const AssignmentType = require('./assignment_type');
const StudentType = require('./student_type');
const SubjectType = require('./subject_type');
const DayType = require('./day_type');
const CalendarType = require('./calendar_type');
const FeedbackType = require('./feedback_type');
const CourseType = require('./course_type');

const Assignments = require('../../services/assignments');
const Students = require('../../services/students');
const Subjects = require('../../services/subjects');
const Dates = require('../../services/dates');
const Feedbacks = require('../../services/feedbacks');
const Terms = require('../../services/terms');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    assignment: {
      type: AssignmentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Assignments.getAssignment(id, req.user)
      }
    },
    student: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Students.getStudent(id);
      }
    },
    subject: {
      type: SubjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Subjects.getSubject(id);
      }
    },
    day: {
      type: DayType,
      args: {
        day: { type: GraphQLDate }
      },
      resolve(parentValue, args, req) {
        return new Promise((resolve, reject) => {
          resolve({ date: args.day });
        });
      }
    },
    calendar: {
      type: CalendarType,
      args: {
        startDate: { type: GraphQLDate }
      },
      resolve(parentValue, args, req) {
        return { startDate: args.startDate };
      }
    },
    feedback: {
      type: new GraphQLList(FeedbackType),
      resolve(parentValue, args, req) {
        return Feedbacks.getFeedbacks(req.user);
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parentValue, args, req) {
        return Terms.getCoursesTaught(req.user);
      }
    }
  })
});

module.exports = RootQueryType;
