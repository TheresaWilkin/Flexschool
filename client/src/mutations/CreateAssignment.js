import gql from 'graphql-tag';

export default gql`
  mutation CreateAssignment($assignment: Assignment) {
    createAssignment(assignment: $assignment) {
      id
    }
  }
`;
