import gql from 'graphql-tag';

export default gql`
  mutation AssignColor($color: String, $id: ID) {
    assignColor(color: $color, id: $id) {
      id
      color
    }
  }
`;
