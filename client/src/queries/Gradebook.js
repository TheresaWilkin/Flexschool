import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      students {
        id
        name
        subjects {
          id
          name
          pointsEarned
          pointsAvailable
        }
      }
    }
  }
`;
