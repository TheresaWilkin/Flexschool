import React from 'react';
import CreateFeedback from './CreateFeedback';
import FeedbackList from './FeedbackList';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <CreateFeedback />
        <FeedbackList />
      </div>
    );
  }
}

export default Feedback;
