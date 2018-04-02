import gql from 'graphql-tag';

export default gql`
  mutation UpdateAssignment($assignment: Assignment) {
  updateAssignment(assignment: $assignment) {
    id
    name
    graded
    submitted
    dueDate
    description
    pointsEarned
    pointsAvailable
    subject {
      id
      name
      student {
        id
        name
      }
    }
  }
  }
`;
