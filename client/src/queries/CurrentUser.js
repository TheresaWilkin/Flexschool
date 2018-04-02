import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      email
      students {
        id
        name
      }
    }
  }
`;
