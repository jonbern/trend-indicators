'use strict';
const columns = require('../utils/columns');

module.exports = (timeSeries, lookback, column) => {
  let ma = {};
  let sum = 0;
  let avg;
  let date;

  for (let i = 0; i < timeSeries.length; i++) {
    if (i < lookback) {
      sum += timeSeries[i][column];
      avg = sum / (i + 1);
    } else {
      sum -= timeSeries[i - 1 - (lookback - 1)][column];
      sum += timeSeries[i][column];
      avg = sum / lookback;
    }

    date = timeSeries[i][columns.date];
    ma[date] = avg;
  }

  return ma;
}
