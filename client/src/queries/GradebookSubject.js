import gql from 'graphql-tag';

export default gql`
  query Subject($id: ID){
    subject(id: $id) {
      id
      name
      pointsEarned
      pointsAvailable
      student {
        id
        name
      },
      assignments {
        id
        name
        pointsEarned
        pointsAvailable
        graded
        submitted
        student {
          id
        }
      }
    }
  }
`;
