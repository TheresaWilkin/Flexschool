import gql from 'graphql-tag';

export default gql`
  mutation DeleteAssignment($assignment: ID) {
    deleteAssignment(assignment: $assignment) {
      id
    }
  }
`;
