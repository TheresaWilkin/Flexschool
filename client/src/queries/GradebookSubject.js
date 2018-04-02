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
      },
      assignments {
        id
        name
        pointsEarned
        pointsAvailable
      }
    }
  }
`;
