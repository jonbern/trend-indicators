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

  it('has columns property', () => {
    expect(indicators.columns).toBeDefined();
  });

});
