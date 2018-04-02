import gql from 'graphql-tag';

export default gql`
  mutation CreateSubject($name: String, $student: ID) {
    createSubject(name: $name, student: $student) {
      id
      name
    }
  }
`;
