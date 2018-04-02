import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { Mutation, Query } from "react-apollo";
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';
import Errors from './Errors';
import Students from './Students';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  title: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none'
  }
});

const ExpandLess = () => <Icon>expand_less</Icon>;
const ExpandMore = () => <Icon>expand_more</Icon>;

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    openStudents: true,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderDrawer({ user }, client) {
    const { classes } = this.props;
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
              <ListItem button component={Link} to="/curriculum">
                <ListItemIcon>
                  <Icon>school</Icon>
                </ListItemIcon>
                <ListItemText primary="Curriculum" />
              </ListItem>
              <ListItem button onClick={() => this.setState({ openStudents: !this.state.openStudents })}>
                <ListItemIcon>
                  <Icon>supervisor_account</Icon>
                </ListItemIcon>
                <ListItemText primary="Students" />
                {this.state.openStudents ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Students open={this.state.openStudents} students={user.students} />
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

  render() {
    const { classes, theme, children } = this.props;

    return (
      <Query query={query} pollInterval={60000}>
        {({ loading, error, data, client }) => {
      if (loading) return "Loading...";
      if (error) { return <Errors error={error} /> }
      return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              ><Icon>menu</Icon>
              </IconButton>
              <Link to="/" className={classes.title}>
                <Typography variant="title" color="inherit" noWrap>
                  Flexible Homeschool
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.renderDrawer(data, client)}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {this.renderDrawer(data, client)}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      )}}
    </Query>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
