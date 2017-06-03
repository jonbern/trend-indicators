'use strict';
const expect = require('expectations');
const movingAverage = require('./movingAverage');

describe('Moving Average', () => {

  let historyTS;

  beforeEach(() => {
    historyTS = [
      ['2016-01-01', 100],
      ['2016-01-02', 300],
      ['2016-01-03', 400],
      ['2016-01-04', 500],
      ['2016-01-05', 600],
      ['2016-01-06', 700]
    ];
  });

  [
    {
      period: 0,
      expected: {
        '2016-01-01': NaN,
        '2016-01-02': NaN,
        '2016-01-03': NaN,
        '2016-01-04': NaN,
        '2016-01-05': NaN,
        '2016-01-06': NaN
      }
    },
    {
      period: 1,
      expected: {
        '2016-01-01': 100,
        '2016-01-02': 300,
        '2016-01-03': 400,
        '2016-01-04': 500,
        '2016-01-05': 600,
        '2016-01-06': 700
      }
    },
    {
      period: 2,
      expected: {
        '2016-01-01': null,
        '2016-01-02': 200,
        '2016-01-03': 350,
        '2016-01-04': 450,
        '2016-01-05': 550,
        '2016-01-06': 650
      }
    },
    {
      period: 3,
      expected: {
        '2016-01-01': null,
        '2016-01-02': null,
        '2016-01-03': 266.67,
        '2016-01-04': 400,
        '2016-01-05': 500,
        '2016-01-06': 600
      }
    },
    {
      period: 6,
      expected: {
        '2016-01-01': null,
        '2016-01-02': null,
        '2016-01-03': null,
        '2016-01-04': null,
        '2016-01-05': null,
        '2016-01-06': 433.33
      }
    },
    {
      period: 7,
      expected: {
        '2016-01-01': null,
        '2016-01-02': null,
        '2016-01-03': null,
        '2016-01-04': null,
        '2016-01-05': null,
        '2016-01-06': null
      }
    },
    {
      period: 8,
      expected: {
        '2016-01-01': null,
        '2016-01-02': null,
        '2016-01-03': null,
        '2016-01-04': null,
        '2016-01-05': null,
        '2016-01-06': null
      }
    }
  ]
  .forEach(testCase => {
    it('n-days: ' + testCase.period, () => {
      let column = 1;
      let result = movingAverage(historyTS, testCase.period, column);

      expect(result).toEqual(testCase.expected);
    });

  });

});
