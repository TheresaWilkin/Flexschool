import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import query from '../queries/Dashboard';
import Dashboard from './Dashboard';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import QueryHandler from './QueryHandler';

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
      <QueryHandler query={query} pollInterval={500}>
        {({ data }) => {
          if (!data.user || !data.user.students || !data.user.students.length) {
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
    </QueryHandler>
    );
  }
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardWrapper);
