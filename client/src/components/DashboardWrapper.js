import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import query from '../queries/Dashboard';
import { Query } from 'react-apollo';
import Errors from './Errors';
import Dashboard from './Dashboard';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  list: {
    overflowY: 'auto'
  },
  button: {
   margin: theme.spacing.unit,
 },
});

class DashboardWrapper extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={query} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <Errors error={error} /> }
          if (!data.user.students.length) {
            return (
              <Button variant="raised" color="secondary" component={Link} to="/students/new" className={classes.button}>
                Add Students
              </Button>
            )
          }
          return (
            <Dashboard data={data} classes={this.props.classes} />
          );
        }
      }
      </Query>
    );
  }
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardWrapper);
