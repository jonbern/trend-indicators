'use strict';
const expect = require('expectations');
const movingAverage = require('./movingAverage');

describe('Moving Average', () => {

  let historyTS;

  beforeEach(() => {
    historyTS = [
      ['2016-01-01', 100],
      ['2016-01-02', 200],
      ['2016-01-03', 300],
      ['2016-01-04', 400],
      ['2016-01-05', 500],
      ['2016-01-06', 600],
    ];
  });

  [
    {
      lookback: 0,
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
      lookback: 1,
      expected: {
        '2016-01-01': 100,
        '2016-01-02': 200,
        '2016-01-03': 300,
        '2016-01-04': 400,
        '2016-01-05': 500,
        '2016-01-06': 600
      }
    },
    {
      lookback: 4,
      expected: {
        '2016-01-01': 100,
        '2016-01-02': 150,
        '2016-01-03': 200,
        '2016-01-04': 250,
        '2016-01-05': 350,
        '2016-01-06': 450
      }
    },
    {
      lookback: 6,
      expected: {
        '2016-01-01': 100,
        '2016-01-02': 150,
        '2016-01-03': 200,
        '2016-01-04': 250,
        '2016-01-05': 300,
        '2016-01-06': 350
      }
    },
    {
      lookback: 10,
      expected: {
        '2016-01-01': 100,
        '2016-01-02': 150,
        '2016-01-03': 200,
        '2016-01-04': 250,
        '2016-01-05': 300,
        '2016-01-06': 350
      }
    }
  ]
  .forEach(testCase => {
    it('lookback: ' + testCase.lookback, () => {
      let column = 1;
      let result = movingAverage(historyTS, testCase.lookback, column);

      expect(result).toEqual(testCase.expected);
    });

  });

});
