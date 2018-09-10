const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLList,
} = graphql;
var GraphQLDate = require('graphql-date')

const UserType = require('./types/user_type');
const AssignmentType = require('./types/assignment_type');
const StudentType = require('./types/student_type');
const SubjectType = require('./types/subject_type');
const FeedbackType = require('./types/feedback_type');
const CourseType = require('./types/course_type');
const TermType = require('./types/term_type');
const WeekType = require('./types/week_type');
const ResourceType = require('./types/resource_type');
const WeeklyTaskType = require('./types/weekly_task_type');
const WeekWeeklyTaskType = require('./types/week_weekly_task_type');
const WeekResourceType = require('./types/week_resource_type');

const AuthService = require('../services/auth');
const Assignments = require('../services/assignments');
const Students = require('../services/students');
const Subjects = require('../services/subjects');
const Feedbacks = require('../services/feedbacks');
const Terms = require('../services/terms');

const AssignmentInput = new GraphQLInputObjectType({
  name: 'Assignment',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pointsEarned: { type: GraphQLInt, defaultValue: 0 },
    pointsAvailable: { type: GraphQLInt },
    subject: { type: GraphQLID },
    description: { type: GraphQLString },
    submitted: { type: GraphQLBoolean, defaultValue: false },
    graded: { type: GraphQLBoolean, defaultValue: false },
    dueDate: { type: GraphQLDate }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    signupStudent: {
      type: StudentType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        return Students.signupStudent(args, req);
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return AuthService.logout(req);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    gradeAssignment: {
      type: AssignmentType,
      args: {
        pointsEarned: { type: GraphQLInt },
        assignment: { type: GraphQLID },
      },
      resolve(parentValue, args, req) {
        return Assignments.gradeAssignment(args, req.user);
      }
    },
    rescheduleAssignment: {
      type: AssignmentType,
      args: {
        assignment: { type: GraphQLID },
        dueDate: { type: GraphQLDate },
      },
      resolve(parentValue, args, req) {
        return Assignments.rescheduleAssignment(args, req.user);
      }
    },
    deleteAssignment: {
      type: AssignmentType,
      args: {
        assignment: { type: GraphQLID },
      },
      resolve(parentValue, args, req) {
        return Assignments.deleteAssignment(args, req.user);
      }
    },
    createAssignment: {
      type: AssignmentType,
      args: {
        assignment: { type: AssignmentInput }
      },
      resolve(parentValue, { assignment }, req) {
        return Assignments.createAssignment(assignment, req.user);
      }
    },
    updateAssignment: {
      type: AssignmentType,
      args: {
        assignment: { type: AssignmentInput }
      },
      resolve(parentValue, { assignment }, req) {
        return Assignments.updateAssignment(assignment, req.user);
      }
    },
    createSubject: {
      type: SubjectType,
      args: {
        student: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        return Subjects.createSubject(args, req)
          .catch(e => console.log(e))
      }
    },
    assignColor: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
        color: { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        return Students.assignColor(args, req.user);
      }
    },
    createFeedback: {
      type: FeedbackType,
      args: {
        feedback: { type: GraphQLString },
      },
      resolve(parentValue, { feedback }, req) {
        return Feedbacks.createFeedback(feedback, req.user);
      }
    },
    createCourse: {
      type: CourseType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }, req) {
        return Terms.createCourse(name, req.user);
      }
    },
    deleteCourse: {
      type: CourseType,
      args: {
        course: { type: GraphQLID },
      },
      resolve(parentValue, { course }, req) {
        return Terms.deleteCourse(course, req.user);
      }
    },
    createTerm: {
      type: TermType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        course: { type: GraphQLID },
        order: { type: GraphQLInt },
        start: { type: GraphQLDate },
        end: { type: GraphQLDate },
        vacations: { type: GraphQLList(GraphQLDate) },
        schooldays: { type: GraphQLList(GraphQLString) },
      },
      resolve(parentValue, args, req) {
        return Terms.createTerm(args, req.user);
      }
    },
    deleteTerm: {
      type: TermType,
      args: {
        term: { type: GraphQLID },
      },
      resolve(parentValue, { term }, req) {
        return Terms.deleteTerm(term, req.user);
      }
    },
    reorderTerms: {
      type: GraphQLList(TermType),
      args: {
        terms: { type: GraphQLList(GraphQLID) },
      },
      resolve(parentValue, { terms }, req) {
        return Terms.reorderTerms(terms, req.user);
      }
    },
    createWeeksForTerm: {
      type: GraphQLList(WeekType),
      args: {
        term: { type: GraphQLID },
      },
      resolve(parentValue, { term }, req) {
        return Terms.createWeeksForTerm(term, req.user);
      }
    },
    createResource: {
      type: ResourceType,
      args: {
        title: { type: GraphQLString },
        terms: { type: GraphQLList(GraphQLID) },
        parts: { type: GraphQLInt },
        partsType: { type: GraphQLString },
        partDuration: { type: GraphQLInt },
        course: { type: GraphQLID },
      },
      resolve(parentValue, args, req) {
        return Terms.createResource(args, req.user);
      }
    },
    createWeeklyTask: {
      type: WeeklyTaskType,
      args: {
        title: { type: GraphQLString },
        terms: { type: GraphQLList(GraphQLID) },
        partDuration: { type: GraphQLInt },
        course: { type: GraphQLID },
        days: { type: GraphQLList(GraphQLString) },
      },
      resolve(parentValue, args, req) {
        return Terms.createWeeklyTask(args, req.user);
      }
    },
    scheduleWeeklyTasksForTerm: {
      type: GraphQLList(WeekWeeklyTaskType),
      args: {
        term: { type: GraphQLID },
      },
      resolve(parentValue, { term }, req) {
        return Terms.scheduleWeeklyTasksForTerm(term, req.user);
      }
    },
    scheduleResourcesForTerm: {
      type: GraphQLList(WeekResourceType),
      args: {
        term: { type: GraphQLID },
      },
      resolve(parentValue, { term }, req) {
        return Terms.scheduleResourcesForTerm(term, req.user);
      }
    }
  })
});

module.exports = mutation;
