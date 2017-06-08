'use strict';
const expect = require('expectations');
const mas = require('./timeSeriesSampler');

describe('Time-series sampler', () => {

  let timeSeries;

  beforeEach(() => {
    timeSeries = [
      ['2016-01-01', 10],
      ['2016-01-02', 50],
      ['2016-01-03', 30],
      ['2016-01-04', 70],
      ['2016-01-05', 40],
      ['2016-01-06', 60],
    ];
  });

  [
    {
      interval: 0,
      expected: {
      }
    },
    {
      interval: 1,
      expected: {
        '2016-01-01': 10,
        '2016-01-02': 50,
        '2016-01-03': 30,
        '2016-01-04': 70,
        '2016-01-05': 40,
        '2016-01-06': 60
      }
    },
    {
      interval: 2,
      expected: {
        '2016-01-02': 50,
        '2016-01-04': 70,
        '2016-01-06': 60
      }
    },
    {
      interval: 3,
      expected: {
        '2016-01-03': 30,
        '2016-01-06': 60
      }
    },
    {
      interval: 4,
      expected: {
        '2016-01-02': 50,
        '2016-01-06': 60
      }
    }
  ]
  .forEach(testCase => {
    it('interval: ' + testCase.interval, () => {
      let result = mas(timeSeries, testCase.interval);
      expect(result).toEqual(testCase.expected);
    });

  });

});
