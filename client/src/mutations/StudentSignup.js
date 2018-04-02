import gql from 'graphql-tag';

export default gql`
  mutation SignupStudent($email: String, $password: String, $name: String){
    signupStudent(email: $email, password: $password, name: $name) {
      id
      email
      name
      teacher
    }
  }
`;
