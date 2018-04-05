import Dashboard from './Dashboard';
import Gradebook from './Gradebook';
import GradebookSubject from './GradebookSubject';
import Calendar from './Calendar';
import moment from 'moment';

export default (subjectId) => {
  if (subjectId) {
    return [
      { query: Gradebook },
      { query: Dashboard },
      { query: GradebookSubject, variables: { id: subjectId } },
      { query: Calendar, variables: { startDate: new Date(moment().startOf('day')) } }
    ];
  } else {
    return [
      { query: Gradebook },
      { query: Dashboard },
      { query: Calendar, variables: { startDate: new Date(moment().startOf('day')) } }
    ];
  }
}
