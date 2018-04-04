import React from 'react';
import { Query } from 'react-apollo';
import query from '../queries/StudentSubjects';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Errors from './Errors';
import MenuItem from 'material-ui/Menu/MenuItem';
import SelectStudent from './SelectStudent';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '250px',
  },
  menu: {
    width: '250px',
  },
});

class SelectSubject extends React.Component {
  state = {
    student: '',
  }

  componentDidMount() {
    if (this.props.defaultStudent) {
      this.setState({ student: this.props.defaultStudent });
    }
  }

  handleStudentChange({ target }) {
    this.setState({ student: target.value });
  }

  render() {
    const { classes, value, handleChange } = this.props;
    return (
      <Query
        query={query}
        onCompleted={() => {

        }}
      >
        {({ loading, error, data }) => {
          if (loading) { return null }
          if (error) { return <Errors error={error} />; }
          const student = data.user.students.find(s => s.id === this.state.student);
          let subjects = [];
          if (student) {
            subjects = student.subjects;
          }
          return (
            <div>
              <SelectStudent
                value={this.state.student}
                handleChange={this.handleStudentChange.bind(this)}
                students={data.user.students}
              />
                <TextField
                  id="select-subject"
                  select
                  label="Subject"
                  className={classes.textField}
                  value={value}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  disabled={!student}
                  margin="normal"
                >
                  {subjects.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
            </div>
          );
        }
      }
      </Query>
    );
  }
}

export default withStyles(styles)(SelectSubject);
