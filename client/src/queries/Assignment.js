import gql from 'graphql-tag';

export default gql`
  query Assignment($id: ID) {
    assignment(id: $id) {
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
