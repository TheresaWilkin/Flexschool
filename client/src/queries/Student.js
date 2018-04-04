import gql from 'graphql-tag';

export default gql`
  query Student($id: ID) {
    student(id: $id) {
      id
      name
      username
      subjects {
        id
        name
        pointsEarned
        pointsAvailable
      }
    }
  }
`;
