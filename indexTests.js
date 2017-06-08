'use strict';
const expect = require('expectations');
const indicators = require('./index');

describe('Trend Indicators package', () => {

  [
    'moMA',
    'movingAverage',
    'toTimeSeries',
    'timeSeriesSampler',
    'snapshot',
    'volatility',
    'columns'
  ].forEach(functionName => {
    it(`it has ${functionName} function`, () => {
      expect(typeof indicators[functionName] === 'function');
    });
  });

});
