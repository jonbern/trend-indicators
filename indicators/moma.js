'use strict';
const columns = require('../utils/columns');
const getMovingAverage = require('./getMovingAverage');
const timeSeriesSampler = require('../utils/timeSeriesSampler');

module.exports = (timeSeries, movingAverageLength, samplingInterval) => {
  let ma = getMovingAverage(timeSeries, movingAverageLength, columns.close, true, true);
  let samples = timeSeriesSampler(ma, samplingInterval);

  let currentValue;
  let previousValue;
  let maxValue;
  let gains = 0;
  let score = null;

  let lastSampleBelowMaxSampleRange = false;

  samples.forEach(sample => {
    currentValue = sample[1];
    
    if (previousValue !== undefined && currentValue - previousValue > 0.1) {
      gains++;
    }

    if (maxValue === undefined || currentValue > maxValue) {
      maxValue = currentValue;
    }

    previousValue = currentValue;
  });
  
  if (previousValue < maxValue * 0.95) {
    lastSampleBelowMaxSampleRange = true;
  }

  if (gains > 0) {
    score = +(gains/(samples.length - 1)).toFixed(3);
  }

  return {
    score,
    sampleCount: samples.length,
    lastSampleBelowMaxSampleRange
  
  };
}
