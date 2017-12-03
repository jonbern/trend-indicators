'use strict';
const expect = require('expectations');
const getMovingAverage = require('./getMovingAverage');

describe('Moving Average', () => {

  let historyTS;
  const columnIndex = 1;

  describe('As object literal with date key', () => {

    beforeEach(() => {
      historyTS = [
        ['2016-01-01', 100],
        ['2016-01-02', 200],
        ['2016-01-03', 300],
        ['2016-01-04', 400],
        ['2016-01-05', 500],
        ['2016-01-06', 600]
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
        let result = getMovingAverage(historyTS, testCase.lookback, columnIndex, false, false);
  
        expect(result).toEqual(testCase.expected);
      });
  
    });

  });

  describe('As time series array', () => {

    beforeEach(() => {
      historyTS = [
        ['2016-01-01', 100],
        ['2016-01-02', 200],
        ['2016-01-03', 300],
        ['2016-01-04', 400],
        ['2016-01-05', 500],
        ['2016-01-06', 600]
      ];
    });
  
    [
      {
        lookback: 0,
        expected: [
          ['2016-01-01', NaN],
          ['2016-01-02', NaN],
          ['2016-01-03', NaN],
          ['2016-01-04', NaN],
          ['2016-01-05', NaN],
          ['2016-01-06', NaN]
        ]
      },
      {
        lookback: 4,
        expected: [
          ['2016-01-01', 100],
          ['2016-01-02', 150],
          ['2016-01-03', 200],
          ['2016-01-04', 250],
          ['2016-01-05', 350],
          ['2016-01-06', 450]
        ]
      },
      {
        lookback: 10,
        expected: [
          ['2016-01-01', 100],
          ['2016-01-02', 150],
          ['2016-01-03', 200],
          ['2016-01-04', 250],
          ['2016-01-05', 300],
          ['2016-01-06', 350]
        ]
      }
    ]
    .forEach(testCase => {
      it('lookback: ' + testCase.lookback, () => {
        let result = getMovingAverage(historyTS, testCase.lookback, columnIndex, true, false);
  
        expect(result).toEqual(testCase.expected);
      });
  
    });

  });

  describe('strict mode', () => {
    
        beforeEach(() => {
          historyTS = [
            ['2016-01-01', 100],
            ['2016-01-02', 200],
            ['2016-01-03', 300],
            ['2016-01-04', 400],
            ['2016-01-05', 500],
            ['2016-01-06', 600]
          ];
        });
      
        [
          {
            lookback: 0,
            expected: [
              ['2016-01-01', NaN],
              ['2016-01-02', NaN],
              ['2016-01-03', NaN],
              ['2016-01-04', NaN],
              ['2016-01-05', NaN],
              ['2016-01-06', NaN]
            ]
          },
          {
            lookback: 4,
            expected: [
              ['2016-01-01', null],
              ['2016-01-02', null],
              ['2016-01-03', null],
              ['2016-01-04', null],
              ['2016-01-05', 350],
              ['2016-01-06', 450]
            ]
          },
          {
            lookback: 10,
            expected: [
              ['2016-01-01', null],
              ['2016-01-02', null],
              ['2016-01-03', null],
              ['2016-01-04', null],
              ['2016-01-05', null],
              ['2016-01-06', null]
            ]
          }
        ]
        .forEach(testCase => {
          it('lookback: ' + testCase.lookback, () => {
            let result = getMovingAverage(historyTS, testCase.lookback, columnIndex, true, true);
            expect(result).toEqual(testCase.expected);
          });
      
        });
    
      });
  

});
