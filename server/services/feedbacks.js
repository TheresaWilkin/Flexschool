const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const Feedback = mongoose.model('feedback');
const moment = require('moment');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function getFeedbacks(user) {
  return Feedback.find({ user: new ObjectId(user.id) })
    .catch(e => {
      console.log(e);
      return null;
    });
}

function createFeedback(feedback, user) {
  const newFeedback = {
    user: new ObjectId(user.id),
    feedback,
    createdDate: new Date(),
    response: '',
    responseDate: null,
  }
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Support Request',
    text: `${feedback}, signed, ${user.email}`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return null;
    } else {
      console.log('Email sent: ' + info.response);
      return Feedback.create(newFeedback)
        .catch(e => console.log(e));
    }
  });
}

module.exports = {
  getFeedbacks,
  createFeedback,
};
