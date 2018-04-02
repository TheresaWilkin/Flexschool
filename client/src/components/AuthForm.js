import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Errors from './Errors';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
   margin: theme.spacing.unit,
 },
 title: {
   marginLeft: theme.spacing.unit,
 },
 error: {
   marginLeft: theme.spacing.unit,
 }
});

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit({ variables: this.state });
  }

  render() {
    const { classes, title, error } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="headline" component="h3" className={classes.title}>
            {title}
        </Typography>
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            id="email"
            label="Email"
            value={this.state.email}
            className={classes.textField}
            autoComplete="username"
            onChange={e => this.setState({ email: e.target.value })}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={this.state.value}
            autoComplete="current-password"
            className={classes.textField}
            margin="normal"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Errors error={error} />
          <Button
            variant="raised"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AuthForm);
