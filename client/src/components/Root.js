import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import requireAuth from './requireAuth';
import Dashboard from './DashboardWrapper';
import Gradebook from './Gradebook';
import Curriculum from './Curriculum';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import StudentSignup from './StudentSignup';
import Assignment from './Assignment';
import Student from './Student';
import GradebookSubject from './GradebookSubject';

const Filler = () => <p>Filler</p>;

class ResponsiveDrawer extends React.Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Filler} />
          <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
          <Route exact path="/gradebook" component={requireAuth(Gradebook)} />
          <Route exact path="/curriculum" component={requireAuth(Curriculum)} />
          <Route exact path="/feedback" component={Filler} />
          <Route exact path="/signin" component={SigninForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/students/new" component={StudentSignup} />
          <Route exact path="/students/:id" component={Student} />
          <Route exact path="/assignments/:id" component={Assignment} />
          <Route exact path="/gradebook/subjects/:id" component={GradebookSubject} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default ResponsiveDrawer;
