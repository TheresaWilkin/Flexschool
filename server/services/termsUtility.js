const moment = require('moment');
const mongoose = require('mongoose');

const isASchoolday = (date, schooldays) => schooldays.includes(date.format('ddd'));

const getNumberSchooldaysInTerm = (term) => {
	let days = 0;
  let date = moment(term.start);
  while (date.isSameOrBefore(term.end, 'day')) {
  	if (isASchoolday(date, term.schooldays)) {
      days++;
    }
    date.add(1, 'day');
  }
  term.vacations.forEach(vacation => {
  	if (isASchoolday(moment(vacation), term.schooldays)) {
    days--;
    }
  });
  return days;
}

const getNumberWeeksInTerm = term => {
	let weeks = 0;
	let date = moment(term.start);
	while (date.isSameOrBefore(term.end, 'day')) {
		weeks++;
		date.add(1, 'week');
	}
	return weeks;
}

const createWeeksForTerm = term => {
	let date = moment(term.start);
	while (date.isSameOrBefore(term.end, 'day')) {
		term.weeks.push({
			start: moment(date),
			end: moment(date).add(6, 'days'),
			resources: [],
			weeklyTasks: [],
			dates: {},
		});
		date.add(1, 'week');
	}
}

const isAVacation = (date, vacations) => {
	return vacations.some(vacation => moment(date).isSame(vacation, 'day'));
}

const getNumberSchooldaysInWeek = (week, term) => {
	let days = 0;
	let date = moment(week.start);
	while (date.isSameOrBefore(week.end, 'day')) {
		if (isASchoolday(date, term.schooldays) && !isAVacation(date, term.vacations)) {
      days++;
    }
		date.add(1, 'day');
	}
	return days;
}

const getWeekFractionOfTerm = (week, term) => {
	const numberSchooldaysInWeek = getNumberSchooldaysInWeek(week, term);
	const numberSchooldaysInTerm = getNumberSchooldaysInTerm(term);
	return numberSchooldaysInWeek / numberSchooldaysInTerm;
}

const getFractionOfCourse = (term, terms) => {
	const numberSchooldaysInCourse = terms.reduce((acc, curr) => acc + getNumberSchooldaysInTerm(curr), 0);
	return getNumberSchooldaysInTerm(term) / numberSchooldaysInCourse;
}

const isLastTerm = (terms, termId) => {
	const sortedTerms = terms.sort((a, b) => a.order - b.order);
}

const getNumberOfPartsForTerm = ({ terms = [], parts }, termId, allTerms) => {
	if (!terms.includes(termId)) {
		return 0;
	}
	if (terms.length === 1) {
		return parts;
	}

	const termFractions = allTerms.map(term => ({ id: term.id, order: term.order, fraction: getFractionOfCourse(term, allTerms) }));
	let earlierParts = 0;
	for (let i = 1; i <= allTerms.length; i += 1) {
		const term = termFractions.find(el => el.order === i);
		if (term.order === allTerms.length) {
			return parts - earlierParts;
		}
		const thisPart = Math.ceil(term.fraction * parts);
		earlierParts += thisPart;
		if (term.id === termId) {
			return thisPart;
		}
	}
	return earlierParts;
}

const getNumberOfPartsForWeek = (resource, week, term) => {
	const numberOfPartsForTerm = getNumberOfPartsForTerm(resource, term.id);
	const weekFractionOfTerm = getWeekFractionOfTerm(week, term);
	return numberOfPartsForTerm * weekFractionOfTerm;
}

const getResourcesTimeScheduledForWeek = (resources) => {
	return resources.reduce((acc, curr) => acc + curr.partDuration, 0);
}

const getTimeScheduledPerDay = (term, week, weeklyTime) => {
	if (weeklyTime === 0) {
		return 0;
	}
	const numberSchooldaysInWeek = getNumberSchooldaysInWeek(week, term);
	return weeklyTime / numberSchooldaysInWeek;
}

const getResourceTimeScheduledPerDay = (term, week) => {
	const resourcesTimeScheduledInWeek = getResourcesTimeScheduledForWeek(week.resources);
	return getTimeScheduledPerDay(term, week, resourcesTimeScheduledInWeek);
}

const getWeeklyTasksTimeScheduledForWeek = (week) => {
	return week.weeklyTasks.reduce((acc, curr) => acc + curr.partDuration, 0);
}

const getWeeklyTasksTimeScheduledPerDay = (term, week) => {
	const weeklyTasksTimeScheduledForWeek = getWeeklyTasksTimeScheduledForWeek(week);
	return getTimeScheduledPerDay(term, week, weeklyTasksTimeScheduledForWeek);
}

const getTimeScheduledPerDayForWeek = (term, week) => {
	const resourcesTimeScheduledPerDay = getResourceTimeScheduledPerDay(term, week);
	const weeklyTasksScheduledPerDay = getWeeklyTasksTimeScheduledPerDay(term, week);
	return resourcesTimeScheduledPerDay + weeklyTasksScheduledPerDay;
}

const getTimeScheduledForWeeks = (term, weeks) => {
	if (!weeks || !weeks.length) {
		return null;
	}
	const weeksTime = weeks.reduce((acc, week) => {
		const numberDays = getNumberSchooldaysInWeek(week, term);
		const taskTime = week.weeklyTasks.reduce((acc, curr) => acc + curr.task.partDuration, 0);
		const resourceTime = week.resources.reduce((acc, curr) => acc + curr.resource.partDuration, 0);
		return Object.assign({}, acc, { [week._id]: {
			numberDays,
			time: taskTime + resourceTime,
			start: week.start,
			id: week._id,
		}});
	}, {});
	return Object.keys(weeksTime).map(week => weeksTime[week]);
}

const getWeekWithLeastWork = (term, weeks) => {
	if (!weeks.length) {
		return null;
	}
	return weeks.reduce((acc, week) => {
    if (!getNumberSchooldaysInWeek(week, term)) {
      return acc;
    }
    if (!getNumberSchooldaysInWeek(acc, term)) {
      return week;
    }
		const weekWork = getTimeScheduledPerDayForWeek(term, week)
		const accWork = getTimeScheduledPerDayForWeek(term, acc);
		if (weekWork < accWork) {
			return week;
		} else if (accWork < weekWork) {
			return acc;
		} else if (moment(week.start).isBefore(acc.start)) {
			return week;
		} else {
			return acc;
		}
	});
}

const scheduleResourceForTerm = (term, resource, terms) => {
	const numberOfPartsForTerm = getNumberOfPartsForTerm(resource, term.id, terms);
	for (i = 0; i < numberOfPartsForTerm; i += 1) {
		const weekWithLeastWork = getWeekWithLeastWork(term);
		weekWithLeastWork.resources.push(resource);
	}
}

const scheduleWeeklyTaskForTerm = (term, task) => {
  if (!task.terms.length || !task.terms.includes(term.id)) {
    return;
  }
	term.weeks.forEach(week => {
		let date = moment(week.start);
		while (date.isSameOrBefore(week.end, 'day')) {
			if (isASchoolday(date, term.schooldays) && !isAVacation(date, term.vacations) && task.days.includes(date.format('ddd'))) {
				week.weeklyTasks.push({
					id: task.id,
					title: task.title,
					terms: task.terms,
					partDuration: task.partDuration,
					days: ['Wed'],
					date: moment(date),
				});
			}
      date.add(1, 'day');
		}
	});
}

const getBiggestResourceForTerm = (resources, term, terms) => {
	if (!resources.length) {
		return null;
	}
	return resources.reduce((acc, curr) => {
		const accSize = getNumberOfPartsForTerm(acc, term.id, terms) * acc.partDuration;
		const currTime = getNumberOfPartsForTerm(curr, term.id, terms) * curr.partDuration;
		if (accSize >= currTime) {
			return acc;
		} else {
			return curr;
		}
	})
}

const scheduleWeeklyTasksForTerm = (term, weeklyTasks) => {
	weeklyTasks.forEach(task => scheduleWeeklyTaskForTerm(term, task));
}

const scheduleResourcesForTerm = (term, resources, terms) => {
	const termResources = resources.filter(resource => resource.terms.includes(term.id));
	let unscheduledResources = termResources;
	for (let i = 0; i <= termResources.length; i += 1) {
		if (!unscheduledResources.length) {
			return;
		}
		let biggestResource = getBiggestResourceForTerm(unscheduledResources, term, terms);
		scheduleResourceForTerm(term, biggestResource, terms);
    var index = unscheduledResources.indexOf(biggestResource);
    if (index > -1) {
      unscheduledResources.splice(index, 1);
    }
	}
}

const scheduleTerm = (term, resources, weeklyTasks, terms) => {
	createWeeksForTerm(term);
	scheduleWeeklyTasksForTerm(term, weeklyTasks);
	scheduleResourcesForTerm(term, resources, terms);
}

const scheduleTerms = (terms, resources, weeklyTasks) => {
	terms.sort((a,b) => a.order - b.order).forEach(term => scheduleTerm(term, resources, weeklyTasks, terms));
}

const createDaysForWeek = (week, term) => {
	let date = moment(week.start);
	while (date.isSameOrBefore(week.end)) {
		if (isASchoolday(date, term.schooldays) && !isAVacation(date, term.vacations)) {
			week.dates[date.format('MM-DD-YYYY')] = { date: moment(date), assignments: [] };
		}
		date.add(1, 'day');
	}
}

const scheduleTasksWithinWeek = (week, tasks) => {
	tasks.forEach(task => {
		const day = week.dates[task.date.format('MM-DD-YYYY')];
		if (!day) {
			return;
		}
		day.assignments.push(task);
	});
}

const getWorkForDate = date => date.assignments.reduce((sum, assignment) => sum + assignment.partDuration, 0);

const getDateWithLeastWork = (dates) => {
	return Object.keys(dates).reduce((acc, curr) => {
		const dateWork = getWorkForDate(dates[curr]);
		const accDateWork = getWorkForDate(dates[acc]);
		if (dateWork < accDateWork) {
			return curr;
		}
		return acc;
	});
}

const getResourcesByLength = resources => resources.sort((a, b) => b.partDuration - a.partDuration);

const scheduleResourcesWithinWeek = (week) => {
	getResourcesByLength(week.resources).forEach(resource => {
		const date = getDateWithLeastWork(week.dates);
		week.dates[date].assignments.push(resource);
	});
}

const scheduleWeek = (term, week) => {
	createDaysForWeek(week, term);
	scheduleTasksWithinWeek(week, week.weeklyTasks);
	scheduleResourcesWithinWeek(week);
}

const scheduleWeeksForTerm = (term) => {
	term.weeks.forEach(week => {
		scheduleWeek(term, week);
	});
}

const scheduleWeeksForCourse = (terms) => {
	terms.forEach(scheduleWeeksForTerm);
}

const printTermDays = (terms) => {
	terms.forEach(term => {
		term.weeks.forEach(week => {
			Object.keys(week.dates).forEach(date => {
				console.log(`${date}: ${week.dates[date].assignments.length}`, week.dates[date].assignments);
			});
		});
	});
}

module.exports = {
  isASchoolday,
  isAVacation,
  getBiggestResourceForTerm,
	getFractionOfCourse,
	getWeekWithLeastWork,
	getTimeScheduledForWeeks,
}
