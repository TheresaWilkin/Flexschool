import gql from 'graphql-tag';

export default gql`
  mutation GradeAssignment($pointsEarned: Int, $assignment: ID) {
    gradeAssignment(pointsEarned: $pointsEarned, assignment: $assignment) {
      id
      pointsEarned
      graded
      submitted
    }
  }
`;
