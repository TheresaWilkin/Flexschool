import gql from 'graphql-tag';

export default gql`
  query Calendar($startDate: Date) {
    calendar(startDate: $startDate) {
      startDate
      dates {
        id
        date
        assignments {
          id
          name
          dueDate
        }
      }
    }
  }
`;
