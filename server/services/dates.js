const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const Assignment = mongoose.model('assignment');
const User = mongoose.model('user');
const Subject = mongoose.model('subject');
const moment = require('moment');
const Assignments = require('./assignments');

function getDates(date) {
  const startDate = moment(date).startOf('week');
  const dates = [];
  for (i = 0; i < 49; i++) {
    dates.push({ date: new Date(moment(startDate).add(i, 'days')) });
  }
  return new Promise((resolve, reject) => {
    resolve(dates);
  });
}

module.exports = {
  getDates
};
