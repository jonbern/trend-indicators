'use strict';
const expect = require('expectations');
const indicators = require('./index');

describe('Trend Indicators package', () => {

  [
    'getMoMA',
    'getMovingAverage',
    'getSnapshot',
    'getVolatility',
    'toTimeSeries',
    'timeSeriesSampler',
  ].forEach(functionName => {
    it(`it has ${functionName} function`, () => {
      expect(typeof indicators[functionName] === 'function').toBe(true);
    });
  });

  [
    'columns',
    'duration'
  ].forEach(propertyName => {
    it(`it has ${propertyName} property`, () => {
      expect(indicators[propertyName]).toBeDefined();
    });
  });



});
