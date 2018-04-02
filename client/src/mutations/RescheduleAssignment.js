import gql from 'graphql-tag';

export default gql`
  mutation RescheduleAssignment($dueDate: Date, $assignment: ID) {
    rescheduleAssignment(dueDate: $dueDate, assignment: $assignment) {
      id
      dueDate
    }
  }
`;
