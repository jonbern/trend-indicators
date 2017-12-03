'use strict';

module.exports = (timeSeries, interval) => {
  if (interval === 0) {
    return [];
  }

  let i = timeSeries.length - 1;
  let samples = [];

  while (i >= 0) {
    samples.push(timeSeries[i]);
    i -= interval;
  }

  return samples.reverse();
}
