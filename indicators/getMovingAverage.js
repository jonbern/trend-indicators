'use strict';
const columns = require('../utils/columns');

module.exports = (timeSeries, lookback, column, returnAsTimeSeries = false, strict = true) => {
  let maTimeSeries = getMovingAverageTimeSeries(timeSeries,lookback, column, strict);

  if (returnAsTimeSeries === true) {
    return maTimeSeries;
  }

  let ma = {};
  maTimeSeries.forEach(row => {
    let date = row[0];
    ma[date] = row[1];
  });

  return ma;
}

const getMovingAverageTimeSeries = (timeSeries, lookback, column, strict) => {
  let ma = [];
  let sum = 0;
  let avg;

  for (let i = 0; i < timeSeries.length; i++) {
    if (i < lookback) {
      sum += timeSeries[i][column];
      avg = sum / (i + 1);
      if (strict && i < lookback) {
        avg = null;
      }
    } else {
      sum -= timeSeries[i - 1 - (lookback - 1)][column];
      sum += timeSeries[i][column];
      avg = sum / lookback;
    }

    ma.push([timeSeries[i][columns.date], avg]);
  }

  return ma;
}
