'use strict';
const expect = require('expectations');
const toTimeSeries = require('./toTimeSeries');

describe('Moving Average Sampling', () => {

  let dateMap;

  beforeEach(() => {
    dateMap = {
      '2015-10-23': 23,
      '2014-10-23': 23,
      '2016-01-01': 1,
      '2016-01-03': 2,
      '2016-11-03': 211,
      '2016-01-02': 3
    }
  });

  it('converts time series, sorted by date', () => {
    let expected = [
      ['2014-10-23', 23],
      ['2015-10-23', 23],
      ['2016-01-01', 1],
      ['2016-01-02', 3],
      ['2016-01-03', 2],
      ['2016-11-03', 211]
    ];
    expect(toTimeSeries(dateMap)).toEqual(expected);
  });

});
