import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
 error: {
   marginLeft: theme.spacing.unit,
 }
});

function Errors({ error, classes }) {
  if (error && error.graphQLErrors) {
    return (
      <div className="errors">
        {error.graphQLErrors.map(error => error.message).map(error => (
          <Typography
            variant="body2"
            key={error}
            className={classes.error}
            color="error"
          >
            {error}
          </Typography>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Errors);
