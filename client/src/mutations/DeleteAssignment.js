import gql from 'graphql-tag';

export default gql`
  mutation GradeAssignment($assignment: ID) {
    gradeAssignment(assignment: $assignment) {
      id
    }
  }
`;
