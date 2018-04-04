import React, { Component } from 'react';
import StudentAuthForm from './StudentAuthForm';
import { withRouter } from 'react-router-dom';
import { Mutation } from "react-apollo";
import mutation from '../mutations/StudentSignup';
import query from '../queries/CurrentUser';

class StudentSignupForm extends Component {
  render() {
    return (
      <Mutation
        mutation={mutation}
        refetchQueries={[{ query }]}
        onCompleted={({ signupStudent: { id } }) => {
          this.props.history.push(`/students/${id}`)
        }}
      >
        {(login, { loading, error }) => (
          <div>
            <StudentAuthForm
              onSubmit={login}
              title="Add student"
              error={error}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(StudentSignupForm);
