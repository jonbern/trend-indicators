'use strict';
const expect = require('expectations');
let calculateSnapshot = require('./snapshot');

describe('Snapshot', function() {

  it('calculates previous close and 52 weeks indicators', () => {

    let historyTS = [
      ['2016-01-01', 10],
      ['2016-01-02', 100],
      ['2016-01-04', 50],
      ['2016-01-06', 25]
    ];

    let expected = {
      percebtChangeFrom52WeekHigh: -0.75,
      percentChangeFrom52WeekLow: 1.5,
      changeFrom52WeekHigh: -75,
      changeFrom52WeekLow: 15,
      previousClose: 25
    }
    expect(calculateSnapshot(historyTS)).toEqual(expected);
  });

  it('does not crash on 0, undefined or null', () => {

    let historyTS = [
      ['2016-01-01', 10],
      ['2016-01-04', 50],
      ['2016-01-02', 100],
      ['2016-01-06', 25],
      ['2016-01-07', 0],
      ['2016-01-08', undefined],
      ['2016-01-08', null],
    ];

    let expected = {
      percebtChangeFrom52WeekHigh: -0.75,
      percentChangeFrom52WeekLow: 1.5,
      changeFrom52WeekHigh: -75,
      changeFrom52WeekLow: 15,
      previousClose: 25
    }
    expect(calculateSnapshot(historyTS)).toEqual(expected);
  });

  it('handles empty array', () => {
    let historyTS = [];
    let expected = null
    expect(calculateSnapshot(historyTS)).toEqual(expected);
  });

});
