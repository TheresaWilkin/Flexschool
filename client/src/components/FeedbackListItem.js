import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import moment from 'moment';

class FeedbackListItem extends Component {
  render() {
    const { id, feedback, createdDate } = this.props;
    return (
      <ListItem key={id}>
        <ListItemText inset primary={feedback} secondary={moment(createdDate).format("YYYY-MM-DD")} />
      </ListItem>
    );
  }
}

export default FeedbackListItem;
