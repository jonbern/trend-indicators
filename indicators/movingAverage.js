'use strict';

module.exports = (timeSeries, period, column) => {
  let ma = {};
  for (let i = 0; i < timeSeries.length; i++) {
    let avg;
    if (period === 0) {
      avg = NaN;
    } else if (i < period - 1) {
      avg = null;
    } else {
      let sum = 0;
      for (let j = 0; j <= period - 1; j++) {
        sum += timeSeries[i - j][column];
      }
      avg = sum / period;
    }
    ma[timeSeries[i][0]] = 
      Number.isFinite(avg) ? +avg.toFixed(2) : avg;
  }

  return ma;
}
