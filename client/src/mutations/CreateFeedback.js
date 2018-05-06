import gql from 'graphql-tag';

export default gql`
  mutation CreateFeedback($feedback: String) {
    createFeedback(feedback: $feedback) {
      id
      feedback
      createdDate
    }
  }
`;
