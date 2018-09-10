import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";
import mutation from '../mutations/Logout';
import Students from './Students';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const ExpandLess = () => <Icon>expand_less</Icon>;
const ExpandMore = () => <Icon>expand_more</Icon>;

class ResponsiveDrawer extends React.Component {
  state = { openStudents: true };

  render() {
    const { classes, data, client } = this.props;
    const { user } = data;
    if (!user) {
      return (
        <div>
            <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem button component={Link} to="/signin" >
                  <ListItemText primary="Sign in" />
                </ListItem>
                <ListItem button component={Link} to="/signup" >
                  <ListItemText primary="Sign up" />
                </ListItem>
              </List>
            </div>
      );
    }
    return (
      <div>
          <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <Icon>dashboard</Icon>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/gradebook">
                <ListItemIcon>
                  <Icon>book</Icon>
                </ListItemIcon>
                <ListItemText primary="Gradebook" />
              </ListItem>
              <ListItem button component={Link} to="/calendar">
                <ListItemIcon>
                  <Icon>date_range</Icon>
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>
              <ListItem button onClick={() => this.setState({ openStudents: !this.state.openStudents })}>
                <ListItemIcon>
                  <Icon>supervisor_account</Icon>
                </ListItemIcon>
                <ListItemText primary="Students" />
                {this.state.openStudents ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Students open={this.state.openStudents} students={user.students} />
              <ListItem button component={Link} to="/courses">
                <ListItemIcon>
                  <Icon>library_books</Icon>
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button component={Link} to="/feedback">
                <ListItemText primary="Submit feedback" />
              </ListItem>
              <Mutation
                mutation={mutation}
                onCompleted={() => {
                  client.resetStore();
                  this.props.history.push('/');
                }}
              >
                {(logout, { data }) => (
                  <ListItem button onClick={logout}>
                    <ListItemText primary="Sign out" />
                  </ListItem>
                )}
              </Mutation>
            </List>
          </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
