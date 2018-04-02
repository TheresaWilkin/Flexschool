import React from 'react';
import { Query } from 'react-apollo';
import query from '../queries/Curriculum';
import { withStyles } from 'material-ui/styles';
import Errors from './Errors';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 2,
  },
});

class Curriculum extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={query}>
        {({ data, loading, error }) => {
          console.log(data)
          return (
            <div />
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Curriculum);
