import gql from 'graphql-tag';

export default gql`
  query Day($day: Date) {
    day(day: $day) {
      id
      date
      assignments {
        id
        name
        dueDate
      }
    }
  }
`;
