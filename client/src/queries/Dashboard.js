import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      students {
        id
        name
      }
      allOverdue {
        id
        name
        dueDate
        pointsAvailable
        student
      }
      allNeedGrading {
        id
        name
        pointsAvailable
        student
      }
      allUpcoming {
        id
        name
        dueDate
        pointsAvailable
        student
      }
    }
  }
`;
