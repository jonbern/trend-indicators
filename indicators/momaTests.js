'use strict';
const expect = require('expectations');
const moma = require('./moma');

describe('Monthly moving average trend', () => {

  [
    {
      name: '2 samples, null values',
      mad: [
        ['2016-01-01', null],
        ['2016-01-02', null]
      ],
      minSamples: 0,
      expected: null
    },
    {
      name: '2 samples, 1 value',
      mad: [
        ['2016-01-01', null],
        ['2016-01-02', 2]
      ],
      minSamples: 0,
      expected: null
    },
    {
      name: '2 samples, 1 gain',
      mad: [
        ['2016-01-01', 1],
        ['2016-01-02', 2]
      ],
      minSamples: 0,
      expected: 1
    },
    {
      name: '2 samples, 1 gain (but not large enough to count)',
      mad: [
        ['2016-01-01', 100],
        ['2016-01-02', 102]
      ],
      minSamples: 0,
      expected: null
    },
    {
      name: '2 samples, 1 gain (gainrease is larger than minPercDiff)',
      mad: [
        ['2016-01-01', 100],
        ['2016-01-02', 103]
      ],
      minSamples: 0,
      expected: 1
    },
    {
      name: '2 samples, 1 dec',
      mad: [
        ['2016-01-01', 2],
        ['2016-01-02', 1]
      ],
      minSamples: 0,
      expected: null
    },
    {
      name: '4 samples, 2 gain, 1 dec',
      mad: [
        ['2016-01-01', 10],
        ['2016-01-02', null],
        ['2016-01-03', 30],
        ['2016-01-04', null],
        ['2016-01-05', null],
        ['2016-01-06', 60],
        ['2016-01-05', null],
        ['2016-01-06', 58]
      ],
      minSamples: 0,
      expected: 0.667
    },
    {
      name: '12 samples, 7 gain, 4 dec',
      mad: [
        ['2016-01-01', 99],
        ['2016-01-02', 97],
        ['2016-01-03', 94],
        ['2016-01-04', 91],
        ['2016-01-05', 88],
        ['2016-01-06', 91],
        ['2016-01-07', 94],
        ['2016-01-08', 97],
        ['2016-01-09', 100],
        ['2016-01-10', 103],
        ['2016-01-11', 105],
        ['2016-01-12', 107]
      ],
      minSamples: 0,
      expected: 0.636
    },
    {
      name: '12 samples, 7 gain, 4 dec, mad.length < minSamples',
      mad: [
        ['2016-01-01', 99],
        ['2016-01-02', 97],
        ['2016-01-03', 94],
        ['2016-01-04', 91],
        ['2016-01-05', 88],
        ['2016-01-06', 91],
        ['2016-01-07', 94],
        ['2016-01-08', 97],
        ['2016-01-09', 100],
        ['2016-01-10', 103],
        ['2016-01-11', 105],
        ['2016-01-12', 107]
      ],
      minSamples: 20,
      expected: null,
    },
    {
      name: '12 samples, 7 gain, 4 dec, mad.length >= minSamples',
      mad: [
        ['2016-01-01', 99],
        ['2016-01-02', 97],
        ['2016-01-03', 94],
        ['2016-01-04', 91],
        ['2016-01-05', 88],
        ['2016-01-06', 91],
        ['2016-01-07', 94],
        ['2016-01-08', 97],
        ['2016-01-09', 100],
        ['2016-01-10', 103],
        ['2016-01-11', 105],
        ['2016-01-12', 107]
      ],
      minSamples: 5,
      expected: 0.636
    },
    {
      name: '12 samples, 7 gain, 4 dec, last sample lower than 5% of max sample',
      mad: [
        ['2016-01-01', 5],
        ['2016-01-02', 4],
        ['2016-01-03', 3],
        ['2016-01-04', 2],
        ['2016-01-05', 1],
        ['2016-01-06', 2],
        ['2016-01-07', 3],
        ['2016-01-08', 4],
        ['2016-01-09', 10],
        ['2016-01-10', 6],
        ['2016-01-11', 7],
        ['2016-01-12', 8]
      ],
      minSamples: 0,
      expected: null
    },
    {
      name: '6 samples and a 15% drop from top. Should be excluded (null)',
      mad: [
        ['2016-01-01', 90],
        ['2016-01-02', 100],
        ['2016-01-03', 90],
        ['2016-01-04', 84.5],
        ['2016-01-04', 105]
      ],
      minSamples: 0,
      expected: null
    }
  ]
  .forEach(testCase => {
    it('calculates moma trend when: ' + testCase.name, () => {
      let result = moma(testCase.mad, testCase.minSamples);
      expect(result).toEqual(testCase.expected);
    });

  });

});
