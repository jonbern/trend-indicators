'use strict';
const moment = require('moment');

module.exports = (timeSeries, interval) => {
  let timeSeriesSampled = {};
  let lastDate = 
    moment(timeSeries[timeSeries.length - 1][0]);

  timeSeries.forEach((row) => {
    let date = row[0];
    let daysDifference = lastDate.diff(moment(date), 'days');

    if (daysDifference % interval === 0) {
      timeSeriesSampled[date] = row[1];
    }
  });

  return timeSeriesSampled;
}
