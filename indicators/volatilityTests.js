'use strict';
const expect = require('expectations');
const volatility = require('./volatility');

describe('Volatility', () => {

  [
    {
      description: '4 values, period 4',
      historyTS: [
        ['2016-01-01', 100],
        ['2016-01-02', 110],
        ['2016-01-03', 120],
        ['2016-01-03', 110]
      ],
      period: 4,
      expected: 8.44
    },
    {
      description: '4 values, period 3',
      historyTS: [
        ['2016-01-01', 100],
        ['2016-01-02', 110],
        ['2016-01-03', 120],
        ['2016-01-03', 110]
      ],
      period: 3,
      expected: 8.71
    },
    {
      description: 'values.length < period',
      historyTS: [
        ['2016-01-01', 100],
        ['2016-01-02', 110],
        ['2016-01-03', 120],
        ['2016-01-03', 110]
      ],
      period: 5,
      expected: null
    },
    {
      description: '5 values, 1 value null, period 4',
      historyTS: [
        ['2016-01-01', 100],
        ['2016-01-02', null],
        ['2016-01-03', 110],
        ['2016-01-04', 120],
        ['2016-01-05', 110]
      ],
      period: 4,
      expected: 8.44
    },
  ]
    .forEach(({ historyTS , period, expected, description }) => {
      it('calculates volatility when ' + description, () => {
        let priceColumn = 1;
        let result = volatility(historyTS, period, 1);
        expect(result).toEqual(expected);
      });
    });

});
