'use strict';
const moment = require('moment');

module.exports = (dateMap, sort = true) => {
  let timeSeries = Object.keys(dateMap).map(date => {
    return [date, dateMap[date]];
  });
  
  if (sort) {
    timeSeries.sort();
  }

  return timeSeries;
}
