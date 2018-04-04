import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import query from '../queries/CurrentUser';
import QueryHandler from './QueryHandler';
import AppBar from './AppBar';
import Drawer from './Drawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = { mobileOpen: false };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <QueryHandler query={query} pollInterval={60000}>
        {({ data, client }) => {
      return (
        <div className={classes.root}>
          <AppBar handleDrawerToggle={this.handleDrawerToggle.bind(this)} />
          <Drawer open={this.state.mobileOpen} onCLose={this.handleDrawerToggle.bind(this)} data={data} client={client} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      )}}
    </QueryHandler>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
