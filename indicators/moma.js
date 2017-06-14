'use strict';

module.exports = (mad, minimumSamplesThreshold = 16, maxValueLowerThreshold = 0.15) => {
  let gains = 0;
  let samples = 0;
  let maxValue;
  let isAboveMaxValueThreshold = true;
  let lastSampleMaxValueThreshold = 0.05;

  const epsilon = mad[0][1] * 0.02;

  mad
    .filter(row => !!row[1])
    .forEach((row, i, array) => {
      if (i > 0 && (row[1] - array[i - 1][1] > epsilon)) {
        gains++;
      }

      if (maxValue === undefined || row[1] > maxValue) {
        maxValue = row[1];
      }

      if (row[1] < maxValue * (1 - maxValueLowerThreshold)) {
        isAboveMaxValueThreshold = false;
      }

      samples++;
    });

  let moMA = null;

  if (isAboveMaxValueThreshold
      && samples > minimumSamplesThreshold 
      && samples > 0 
      && gains > 0 
      && mad[mad.length - 1][1] > maxValue * (1 - lastSampleMaxValueThreshold)) {
    moMA = +(gains/(samples - 1)).toFixed(3);
  }

  return moMA;
}
