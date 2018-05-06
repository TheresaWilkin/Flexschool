import gql from 'graphql-tag';

export default gql`
  {
    feedback {
      id
      feedback
      createdDate
      responseDate
      response
    }
  }
`;
