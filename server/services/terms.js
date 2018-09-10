const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId
const Term = mongoose.model('term');
const Course = mongoose.model('course');
const Week = mongoose.model('week');
const Resource = mongoose.model('resource');
const WeeklyTask = mongoose.model('weeklyTask');
const Utilities = require('./termsUtility');
const WeekWeeklyTask = mongoose.model('week_weeklyTask');
const WeekResource = mongoose.model('week_resource');

const moment = require('moment');

function getTerms(courseId) {
  return Term.find({ course: new ObjectId(courseId) })
    .sort({order: 'asc'})
    .catch(e => {
      console.error(e);
      return null;
    });
}

function getTerm(termId) {
  return Term.findOne({ _id: new ObjectId(termId) })
    .catch(e => {
      console.error(e);
      return null;
    });
}

function getCourse(courseId) {
  return Course.findOne({ _id: new ObjectId(courseId) })
    .catch(e => {
      console.error(e);
      return null;
    });
}

function getCoursesTaught(user) {
  return Course.find({ teacher: new ObjectId(user._id) })
    .catch(e => {
      console.error(e);
      return null;
    });
}

function createCourse(name, user) {
  const newCourse = { teacher: new ObjectId(user._id), name };
  return Course.create(newCourse)
    .catch(err => console.error(err));
}

function deleteCourse(courseId, user) {
  return getCourse(courseId)
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this assignment.');
      }
      return Course.remove({ _id: new ObjectId(courseId) })
    })
    .then((res) => {
      return Course.findOne({ _id: new ObjectId(courseId) });
    })
    .catch(err => console.error(err));
}

function createTerm(term, user) {
  return getCourse(term.course)
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this course.');
      }
      const newTerm = Object.assign({}, term,
        { course: new ObjectId(term.course) });
      return Term.create(newTerm)
    })
    .catch(err => console.error(err));
}

function deleteTerm(termId, user) {
  return getTerm(termId)
    .then(term => {
      return getCourse(term.course)
      .then(course => {
        if (course.teacher.toString() != user._id) {
          throw new Error('You are not the teacher for this term.');
        }
        return Term.remove({ _id: new ObjectId(termId) })
      });
    })
    .then((res) => {
      return Term.findOne({ _id: new ObjectId(termId) });
    })
    .catch(err => console.error(err));
}

function updateTermOrder(termId, order) {
  return Term.update({ _id: new ObjectId(termId) }, {
    $set: { order: order }
  });
}

function reorderTerms(terms, user) {
  if (!terms.length) {
    return [];
  }
  return getTerm(terms[0])
    .then(term => {
      return getCourse(term.course)
      .then(course => {
        if (course.teacher.toString() != user._id) {
          throw new Error('You are not the teacher for this term.');
        }
        return Promise.all(terms.map(updateTermOrder));
      });
    })
    .then(res => {
      return Promise.all(terms.map(getTerm));
    })
    .catch(e => {
      console.error(e);
      return null;
    })
}

function getWeeks(term) {
  return Week.find({ term: new ObjectId(term._id) })
    .sort({start: 'desc'})
    .catch(e => {
      console.error(e);
      return null;
    });
}

function createWeek(week) {
  return Week.create(week);
}

function createWeeksForTerm(termId, user) {
  const weeks = [];
  return getTerm(termId)
  .then(term => {
    let date = moment(term.start);
    while (moment(date).add(6, 'days').isSameOrBefore(term.end, 'day')) {
      weeks.push({
        start: moment(date),
        end: moment(date).add(6, 'days'),
        term: new ObjectId(term.id),
      });
      date.add(1, 'week');
    }
    if (date.isSameOrBefore(term.end, 'day')) {
      weeks.push({
        start: moment(date),
        end: term.end,
        term: new ObjectId(term.id),
      });
    }
    return getCourse(term.course)
  })
  .then(course => {
    if (course.teacher.toString() != user._id) {
      throw new Error('You are not the teacher for this term.');
    }
    return deleteWeeksForTerm(termId, user)
  })
  .then(() => {
    return Promise.all(weeks.map(createWeek));
  })
  .catch(e => {
    console.error(e);
    return null;
  });
}

function deleteWeeksForTerm(termId, user) {
  const weeks = [];
  return getTerm(termId)
  .then(term => {
    return getCourse(term.course)
  })
  .then(course => {
    if (course.teacher.toString() != user._id) {
      throw new Error('You are not the teacher for this term.');
    }
    return Week.remove({ term: new ObjectId(termId) });
  })
  .catch(e => {
    console.error(e);
    return null;
  });
}

function getResources(courseId) {
  return Resource.find({ course: new ObjectId(courseId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getResourcesForTerm(termId) {
  return Resource.find({ terms: new ObjectId(termId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getWeekResourcesForTerm(termId) {
  return getWeeks(termId)
  .then(weeks => {
    const weekIds = weeks.map(week => new ObjectId(week._id));
    return WeekResource.find({ week: { $in: weekIds } })
  })
}

function createResource(resource, user) {
  return getCourse(resource.course)
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this course.');
      }
      const newResource = Object.assign({}, resource, {
        course: new ObjectId(resource.course),
        terms: resource.terms.map(id => new ObjectId(id)),
      });
      return Resource.create(newResource)
    })
    .catch(e => {
      console.error(e);
      return null;
    });
}

function getWeeklyTasks(courseId) {
  return WeeklyTask.find({ course: new ObjectId(courseId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function createWeeklyTask(task, user) {
  return getCourse(task.course)
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this course.');
      }
      const newTask = Object.assign({}, task, {
        course: new ObjectId(task.course),
        terms: task.terms.map(id => new ObjectId(id)),
      });
      return WeeklyTask.create(newTask)
    })
    .catch(e => {
      console.error(e);
      return null;
    });
}

const scheduleWeeklyTaskForTerm = (term, task, weeks) => {
  if (!task.terms.length || !task.terms.some(id => term.id.toString() === id.toString())) {
    return;
  }
  return WeekWeeklyTask.remove({ date: { $gte: term.start, $lte: term.end }, task: new ObjectId(task.id) })
  .then(() => {
    return Promise.all(weeks.reduce((acc, week) => {
      let date = moment(week.start);
      const weeklyTasks = [];
  		while (date.isSameOrBefore(week.end, 'day')) {
  			if (Utilities.isASchoolday(date, term.schooldays) && !Utilities.isAVacation(date, term.vacations) && task.days.includes(date.format('ddd'))) {
          weeklyTasks.push({
  					task: new ObjectId(task.id),
  					date: moment(date),
            week: new ObjectId(week.id),
  				});
  			}
        date.add(1, 'day');
  		}
      return [...acc, ...weeklyTasks.map(task => WeekWeeklyTask.create(task))];
    }, []))
    .catch(e => {
      console.error(e);
      return null;
    })
  })
}

function scheduleWeeklyTasksForTerm(termId, user) {
  let term = {};
  let weeklyTasks = [];
  return getTerm(termId)
    .then(res => {
      term = res;
      return getCourse(term.course);
    })
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this course.');
      }
      return getWeeklyTasks(course.id)
    })
    .then(res => {
      weeklyTasks = res;
      return getWeeks({ id: termId })
    })
    .then(weeks => {
      return Promise.all(weeklyTasks.map(task => scheduleWeeklyTaskForTerm(term, task, weeks)));
    })
    .then(res => {
      return res.reduce((acc, curr) => [...acc, ...curr], []);
    })
    .catch(e => {
      console.error(e);
      return null;
    })
}

function getWeeklyTasksForWeek(weekId) {
  return WeekWeeklyTask.find({ week: new ObjectId(weekId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getNestedWeeklyTasksForWeek(weekId) {
  let tasks = [];
  return WeekWeeklyTask.find({ week: new ObjectId(weekId) })
  .then(ts => {
    tasks = ts;
    return Promise.all(tasks.map(task => getWeeklyTask(task.task)));
  })
  .then(t => {
    return tasks.map((task, i) => Object.assign({}, task._doc, { task: t[i] }));
  })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getWeeklyTask(taskId) {
  return WeeklyTask.findOne({ _id: new ObjectId(taskId) })
  .catch(e => {
    console.error(e);
    return null;
  });
}

function scheduleResourcesForTerm(termId, user) {
  let term = {};
  return getTerm(termId)
    .then(res => {
      term = res;
      return getCourse(term.course);
    })
    .then(course => {
      if (course.teacher.toString() != user._id) {
        throw new Error('You are not the teacher for this course.');
      }
      return Promise.all([getResources(course.id), getWeeks({ id: termId }), getTerms(course.id)]);
    })
    .then(res => {
      const resources = res[0];
      const weeks = res[1];
      const terms = res[2];
      return scheduleResourcesInOrderOfSize(term, resources, weeks, terms);
    })
    .then(() => {
      return getWeekResourcesForTerm(new ObjectId(termId))
    })
    .catch(e => {
      console.error(e);
      return null;
    })
}

function getResource(resourceId) {
  return Resource.findOne({ _id: new ObjectId(resourceId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getResourcesForWeek(weekId) {
  return WeekResource.find({ week: new ObjectId(weekId) })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getNestedResourcesForWeek(weekId) {
  let resources = [];
  return WeekResource.find({ week: new ObjectId(weekId) })
  .then(rs => {
    resources = rs;
    return Promise.all(resources.map(r => getResource(new ObjectId(r.resource))));
  })
  .then(r => {
    return resources.map((resource, i) => Object.assign({}, resource._doc, { resource: r[i] }));
  })
  .catch(e => {
    console.error(e);
    return null;
  })
}

function getFullTermWeeks(termId) {
  let fullWeeks = [];
  return getWeeks(termId)
    .then(weeks => {
      fullWeeks = weeks;
      return Promise.all(fullWeeks.map(week => getNestedWeeklyTasksForWeek(week._id)));
    })
    .then(tasks => {
      fullWeeks = fullWeeks.map((week, i) => Object.assign({}, week._doc, { weeklyTasks: tasks[i] }));
      return Promise.all(fullWeeks.map(week => getNestedResourcesForWeek(week._id)));
    })
    .then(resources => {
      fullWeeks = fullWeeks.map((week, i) => Object.assign({}, week, { resources: resources[i] }));
      return fullWeeks;
    })
    .catch(e => {
      console.error(e);
      return null;
    });
}


const scheduleResourceForTerm = (term, resource, terms) => {
  return getWeeks(term._id)
  .then(weeks => {
    const weekIds = weeks.map(week => new ObjectId(week._id));
    return WeekResource.remove({ week: { $in: weekIds }, resource: new ObjectId(resource._id) })
  })
  .then(() => {
    return getFullTermWeeks(new ObjectId(term._id))
  })
  .then(weeks => {
    const weeksTime = Utilities.getTimeScheduledForWeeks(term, weeks);
  	const numberOfPartsForTerm = getNumberOfPartsForTerm(resource, term, terms);
    return new Promise((resolve, reject) => {
        const schedule = function(i, times) {
          if (i === null || i === undefined || i >= numberOfPartsForTerm) {
            resolve(true);
            return;
          }
          return scheduleResourcePart(term, resource, times)
            .then(res => {
              const weekIndex = weeksTime.findIndex(week => week.id === res.week);
              let weekTimes = times;
              if (weekIndex !== -1) {
                weekTimes[weekIndex] = Object.assign({}, weekTimes[weekIndex], { time: weekTimes[weekIndex].time + resource.partDuration });
              }
              return schedule(i + 1, weekTimes);
            })
        }

       return schedule(0, weeksTime)
    })
  })
  .catch(e => {
    console.error(e);
  })
}

function scheduleResourcePart(term, resource, weeks) {
    const weekWithLeastWork = weeks.reduce((acc, curr) => {
      const weekWork = curr.time / curr.numberDays;
      const accWork = acc.time / acc.numberDays;
      if (!weekWork || weekWork < accWork) {
  			return curr;
  		} else if (!accWork || accWork < weekWork) {
  			return acc;
  		} else if (moment(curr.start).isBefore(acc.start)) {
  			return curr;
  		} else {
  			return acc;
  		}
    })

    const weekResource = {
      resource: new ObjectId(resource._id),
      week: new ObjectId(weekWithLeastWork.id),
    };
    return WeekResource.create(weekResource)
  .catch(e => {
    console.error(e);
    return null;
  });
}

const getNumberOfPartsForTerm = ({ terms = [], parts }, term, allTerms) => {
	if (!occursInTerm(terms, term._id)) {
		return 0;
	}

	if (terms.length === 1) {
		return parts;
	}
	const termFractions = allTerms.map(t => ({
    id: t.id, order: t.order, fraction: Utilities.getFractionOfCourse(t, allTerms),
  }));
  let earlierParts = 0;
	for (let i = 1; i <= allTerms.length; i += 1) {
		const t = termFractions.find(el => el.order === i);
    if (!t) continue;
		if (t.order === allTerms.length) {
			return parts - earlierParts;
		}
		const thisPart = Math.ceil(t.fraction * parts);
		earlierParts += thisPart;
		if (t._id === term._id) {
			return thisPart;
		}
	}
	return earlierParts;
}

const getBiggestResourceForTerm = (resources, term, terms) => {
	if (!resources.length) {
		return null;
	}
	return resources.reduce((acc, curr) => {
		const accSize = getNumberOfPartsForTerm(acc, term, terms) * acc.partDuration;
		const currTime = getNumberOfPartsForTerm(curr, term, terms) * curr.partDuration;
		if (accSize >= currTime) {
			return acc;
		} else {
			return curr;
		}
	})
}

const occursInTerm = (terms, termId) => {
  if (!terms || !termId) return false;
  return terms.some(t => t.toString() === termId.toString())
};

function scheduleResourcesInOrderOfSize(term, resources, weeks, terms) {
  const termResources = resources.filter(resource => occursInTerm(resource.terms, term._id));
  let unscheduledResources = termResources;
  return new Promise((resolve, reject) => {
      const scheduleBiggest = function(rs) {
          if (!rs.length) {
            return resolve();
          }
          let biggestResource = getBiggestResourceForTerm(rs, term, terms);
          scheduleResourceForTerm(term, biggestResource, terms, weeks)
            .then(res => {
            var index = rs.indexOf(biggestResource);
              if (index > -1) {
                rs.splice(index, 1);
                scheduleBiggest(rs);
              }
            });
      }

     scheduleBiggest(unscheduledResources);

  });
}

module.exports = {
  getCourse,
  getCoursesTaught,
  createCourse,
  deleteCourse,
  createTerm,
  deleteTerm,
  getTerm,
  getTerms,
  reorderTerms,
  getWeeks,
  createWeeksForTerm,
  getResources,
  createResource,
  getWeeklyTasks,
  createWeeklyTask,
  getWeeklyTask,
  scheduleWeeklyTasksForTerm,
  getWeeklyTasksForWeek,
  scheduleResourcesForTerm,
  getResource,
  getResourcesForWeek,
};
