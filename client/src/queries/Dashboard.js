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
        student {
          id
          name
        }
      }
      allNeedGrading {
        id
        name
        pointsAvailable
        student {
          id
          name
        }
      }
      allUpcoming {
        id
        name
        dueDate
        pointsAvailable
        student {
          id
          name
        }
      }
    }
  }
`;
